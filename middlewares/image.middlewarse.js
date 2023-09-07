const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirPath = path.join(__dirname, "../tmp");

    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueFileName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueFileName + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = { upload };
