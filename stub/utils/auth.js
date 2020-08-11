const validUsername = "admin@mail.ru";
const authCookie = 123456;
const rememberMeCookie = 777777777;

const { COOKIES, HTTP_CODES } = require("../../src/constants/http");

const addAuthCookie = (req, res, next) => {
  if (req.body) {
    const { username, rememberMe } = req.body;
    if (username === validUsername) {
      res.cookie(COOKIES.JSESSIONID, authCookie);
      res.cookie(COOKIES.USERNAME, username);
      if (rememberMe) {
        res.cookie(COOKIES.REMEMBER_ME, rememberMeCookie);
      }
    }
  }
  next();
};

const checkLogin = (req, res) => {
  if (req.body) {
    const username = req.body.username;
    if (username === validUsername) {
      res.status(HTTP_CODES.SUCCESS).json({});
    }
  }
  res.status(HTTP_CODES.BAD_REQUEST).json({
    errorCode: "OLVE-6",
    errorDescription: "Неверный логин или пароль",
    errorMessage: "Bad credentials",
  });
};

module.exports = { addAuthCookie, checkLogin };
