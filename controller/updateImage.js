const { User } = require("../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const updateImage = async (req, res, next) => {
  const { id } = req.params;
  const { filename } = req.file;
  const tmpPath = path.join(__dirname, "../tmp", filename);
  const publicPath = path.join(__dirname, "../public/avatars", filename);
  const avatarSize = 250;

  try {
    const image = await Jimp.read(tmpPath);

    await image.resize(avatarSize, avatarSize);

    await image.write(publicPath);

    const user = await User.findByIdAndUpdate(
      id,
      {
        avatarURL: publicPath,
      },
      { new: true }
    );

    return res.json({ avatarURL: user.avatarURL });
  } catch (e) {
    await fs.unlink(tmpPath);
    next(e);
  }
};

module.exports = { updateImage };
