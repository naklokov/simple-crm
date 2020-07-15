const { HTTP_CODES } = require("../../src/constants/http");

const checkToken = (req, res) => {
  if (req.body) {
    const { token } = req.body;
    if (token.length > 2) {
      res.status(HTTP_CODES.SUCCESS).json({});
    }

    res.status(HTTP_CODES.UNAUTHORIZED).json({});
  }
};

module.exports = { checkToken };
