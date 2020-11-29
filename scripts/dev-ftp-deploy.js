const SftpClient = require("ssh2-sftp-client");
const path = require("path");

const dotenvPath = path.join(__dirname, "..", ".env");
require("dotenv").config({ path: dotenvPath });

const config = {
  host: "77.222.60.155",
  username: "root",
  password: "xavutiiziw",
  port: 22,
};

async function main() {
  const client = new SftpClient("upload-test");
  console.log(__dirname);
  const src = path.join(__dirname, "..", "build");
  const dst = "/var/www/crm";

  try {
    await client.connect(config);
    client.on("upload", (info) => {
      console.log(`Listener: Uploaded ${info.source}`);
    });
    let rslt = await client.uploadDir(src, dst);
    return rslt;
  } finally {
    client.end();
  }
}

main()
  .then((msg) => {
    console.log("\x1b[32m%s\x1b[0m", `UPLOAD SUCCESSFUL`);
    console.log("\x1b[32m%s\x1b[0m", msg);
  })
  .catch((err) => {
    console.log("\x1b[31m%s\x1b[0m", `ERROR ON UPLOAD: ${err.message}`);
  });
