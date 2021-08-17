const multer = require("multer");
const { tokenVerifier } = require("../helpers/jwt");

const MulterSingle = (dest) => {
  //type = "single" | "array"
  var storage = multer.diskStorage({
    destination: `${dest}`,
    filename: (req, file, cb) => {
      const { access_token } = req.headers;
      let name;

      if (access_token) {
        const decoded = tokenVerifier(access_token);
        name = decoded.name.split(" ");
        name = name[0];
      } else {
        name = "user";
        // console.log(req.body.name);
        // name = req.body.name;
        // name = name.split(" ");
      }

      cb(null, name.toLowerCase() + "-" + Date.now() + "-" + file.originalname);
    },
  });
  var upload = multer({
    storage: storage,
    // fileFilter: (req, file, cb) => {
    //   if (file.originalname === "converse-run-star-2.jpg") {
    //     return cb(new Error("Only pdfs are allowed"));
    //   }
    //   cb(null, true);
    // },
  });

  return upload.single("file");
};

const MulterArray = () => {
  //type = "single" | "array"
  var storage = multer.diskStorage({
    destination: "./public/images/products/",
    filename: (req, file, cb) => {
      const { access_token } = req.headers;
      const decoded = tokenVerifier(access_token);
      const name = decoded.name.split(" ");

      // file.status = true;

      const mimetype = file.mimetype.split("/");

      // cb(null, Date.now() + "-" + file.originalname);
      cb(null, name[0].toLowerCase() + "-" + Date.now() + "." + mimetype[1]);
    },
  });
  var upload = multer({
    storage: storage,
  });

  return upload.array("file", 4);
};

module.exports = { MulterSingle, MulterArray };
