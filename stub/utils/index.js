const { addAuthCookie, checkLogin } = require("./auth");
const { v4 } = require("uuid");
const { HTTP_CODES } = require("../../src/constants/http");

const loggerStub = require("./logger");
const { checkToken } = require("./token");

const sendSuccessResponce = (json = {}) => (req, res) => {
  console.log("enter send success");
  res.status(HTTP_CODES.SUCCESS).json(json);
};

const sendPostResponce = (fullEntity) => (req, res) => {
  const fields = req.body;
  res.status(HTTP_CODES.SUCCESS).json({
    ...fullEntity,
    ...fields,
    id: v4(),
  });
};

module.exports = {
  addAuthCookie,
  checkLogin,
  loggerStub,
  checkToken,
  sendSuccessResponce,
  sendPostResponce,
};
