const jwt = require("jsonwebtoken");
const secretCode = "TRYOUTFINALPROJECT";

const tokenGenerator = (user) => {
  const { email, password, type } = user;
  const token = jwt.sign({ email, password, type }, secretCode);
  return token;
};

const tokenVerifier = (token) => {
  const decoded = jwt.verify(token, secretCode);
  return decoded;
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
