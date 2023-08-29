const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { JWT_SICRET_KEY } = process.env;

const chekJwtToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json("Not authorized");
    }

    const decodedToken = jwt.verify(token, JWT_SICRET_KEY);

    const exsistingUser = await User.findById(decodedToken.sub);

    if (!exsistingUser.token || exsistingUser.token !== token) {
      res.status(401).json("Not authorized");
    }

    req.user = { sub: decodedToken.sub, email: decodedToken.email };
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { chekJwtToken };
