const { addAuthCookie, checkLogin } = require("./auth");
const { HTTP_CODES } = require("../../src/constants/http");

const loggerStub = require("./logger");
const { checkToken } = require("./token");

const sendSuccessResponce = (json = {}) => (req, res) => {
  console.log("enter send success");
  res.status(HTTP_CODES.SUCCESS).json(json);
};

module.exports = {
  addAuthCookie,
  checkLogin,
  loggerStub,
  checkToken,
  sendSuccessResponce,
};
