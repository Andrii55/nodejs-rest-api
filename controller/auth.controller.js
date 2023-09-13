const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { validateUser } = require("../middlewares");
const sendMail = require("../helpers/sendMail");
const { v4 } = require("uuid");

const { JWT_SICRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const avatarURL = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const uuid = v4();

    await sendMail(
      email,
      "Please, confirm you email",
      `<a href="localhost:3001/api/verify/${uuid}">Confirm you email</a>`
    );

    const newUser = await User.create({
      email,
      avatarURL,
      password: hashedPassword,
      verificationToken: uuid,
    });

    const result = await newUser.save();

    return res.status(201).json({
      id: result._id,
      email: result.email,
    });
  } catch (e) {
    next(e);
  }
};

const signin = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!user.verify) {
      throw res.status(401, "Email is not verified! Check your mailbox");
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      throw res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = { sub: user._id, email: user.email };
    const token = jwt.sign(payload, JWT_SICRET_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user._id, { token });

    return res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.sub, { token: null });
    res.status(200).json();
  } catch (e) {
    next(e);
  }
};

module.exports = { signup, signin, logout };
