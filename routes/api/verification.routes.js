const express = require("express");

const router = express.Router();

const { verifyController } = require("../../controller");

router.get("/verify/:token", verifyController.verifyEmail);

module.exports = router;
