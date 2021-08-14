const express = require("express");
const router = express.Router();

const { authentication } = require("../middlewares/admin");

const adminRouter = require("./admin");
const apiRouter = require("./api");

router.use("/admins", authentication, adminRouter);
router.use("/api", apiRouter);

module.exports = router;
