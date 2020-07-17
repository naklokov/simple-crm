const { addAuthCookie, sendStatus } = require("./auth");
const { HTTP_CODES } = require("../../src/constants/http");

const loggerStub = require("./logger");
const { checkToken } = require("./token");

const emptySuccess = (req, res) => res.status(HTTP_CODES.SUCCESS).json({});

module.exports = {
  addAuthCookie,
  sendStatus,
  loggerStub,
  checkToken,
  emptySuccess,
};
