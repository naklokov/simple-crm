const validUsername = "admin@mail.ru";
const authCookie = 123456;
const rememberMeCookie = 777777777;

const {
  AUTH_COOKIE_SESSION,
  AUTH_COOKIE_USERNAME,
  AUTH_COOKIE_REMEMBER_ME,
  HTTP_CODES,
} = require("../../src/constants/http");

const addAuthCookie = (req, res, next) => {
  if (req.body) {
    const { username, rememberMe } = req.body;
    if (username === validUsername) {
      res.cookie(AUTH_COOKIE_SESSION, authCookie);
      res.cookie(AUTH_COOKIE_USERNAME, username);
      if (rememberMe) {
        res.cookie(AUTH_COOKIE_REMEMBER_ME, rememberMeCookie);
      }
    }
  }
  next();
};

const sendStatus = (req, res) => {
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

module.exports = { addAuthCookie, sendStatus };
