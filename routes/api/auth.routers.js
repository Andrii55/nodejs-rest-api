const express = require("express");

const router = express.Router();

const { authController } = require("../../controller");

const { chekJwtToken } = require("../../middlewares/jwt_token.middlewarse");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/logout", chekJwtToken, authController.logout);

module.exports = router;
