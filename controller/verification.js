const { tokenSchema } = require("../middlewares/verify.middlewarse");
const { User } = require("../models");

const verifyEmail = async (req, res, next) => {
  const { error } = tokenSchema.validate(req.params.token);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { token } = req.params;

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const response = await User.findOneAndUpdate(
    { verificationToken: token },
    { verify: true, verificationToken: null },
    { new: true }
  );

  console.log("response: ", response);

  return res.status(200).json({ message: "User verificated" });
};

module.exports = { verifyEmail };
