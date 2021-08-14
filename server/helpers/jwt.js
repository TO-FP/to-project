const jwt = require("jsonwebtoken");
const secretCode = "TRYOUTFINALPROJECT";

const tokenGenerator = (user) => {
  const { id, name, email, password, type } = user;
  const token = jwt.sign({ id, name, email, password, type }, secretCode);
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
