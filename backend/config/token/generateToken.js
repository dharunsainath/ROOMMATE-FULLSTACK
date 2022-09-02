const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "dharunsainath", { expiresIn: "20d" });
};

module.exports = generateToken;