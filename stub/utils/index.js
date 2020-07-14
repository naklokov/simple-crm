const { addAuthCookie, sendStatus } = require("./auth");
const loggerStub = require("./logger");

module.exports = {
  addAuthCookie,
  sendStatus,
  loggerStub,
};
