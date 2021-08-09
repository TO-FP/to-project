const express = require("express");
const router = express.Router();

const adminRouter = require("./adminRouter");

router.use("/admins", adminRouter);

module.exports = router;
