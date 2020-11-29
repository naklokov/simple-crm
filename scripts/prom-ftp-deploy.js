var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

var config = {
  user: "prom",
  // Password optional, prompted if none given
  password: "prom123",
  // external
  host: "176.212.190.167",
  // internal
  // host: "176.212.190.167",
  port: 21,
  localRoot: "build/",
  remoteRoot: "/nginx-pl/www/crm",
  include: ["*", "**/*"], // this would upload everything except dot files
  // include: ["*.php", "dist/*", ".*"],
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [
    "dist/**/*.map",
    "node_modules/**",
    "node_modules/**/.*",
    ".git/**",
  ],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: true,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: false,
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log("prom has been published:", res))
  .catch((err) => console.log(err));
