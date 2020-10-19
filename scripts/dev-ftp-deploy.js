var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

var config = {
  user: "test",
  password: "test123",
  host: "176.212.190.167",
  port: 31,
  localRoot: "build/",
  remoteRoot: "/nginx/www/crm",
  include: ["*", "**/*"],
  exclude: [
    "dist/**/*.map",
    "node_modules/**",
    "node_modules/**/.*",
    ".git/**",
  ],
  deleteRemote: true,
  forcePasv: false,
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log("dev has been published:", res))
  .catch((err) => console.log(err));
