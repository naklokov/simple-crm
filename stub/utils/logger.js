module.exports = (req, res) => {
  const { message, logLevel } = req.body;
  console.log(
    "\x1b[36m%s\x1b[0m",
    `[REMOTE LOGGER] ${logLevel} message send to server`
  );

  res.status(200).json({});
};
