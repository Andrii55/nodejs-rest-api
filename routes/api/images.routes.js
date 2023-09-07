const express = require("express");

const router = express.Router();

const { imageController } = require("../../controller");

const { upload } = require("../../middlewares");

router.post("/upload", upload.single("image"), imageController.updateImage);
router.patch(
  "/:id/avatars",
  upload.single("image"),
  imageController.updateImage
);

module.exports = router;