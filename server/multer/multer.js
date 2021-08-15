const multer = require("multer");

const Multer = () => {
  var storage = multer.diskStorage({
    destination: `/public/`,
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer(storage);
  return upload.single("file");
};

module.exports = Multer;
