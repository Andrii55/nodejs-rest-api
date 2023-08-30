const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../middlewares");

const { JWT_SICRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ id: result._id, email });
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
