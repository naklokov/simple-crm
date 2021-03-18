const { version = "NEW VERSION" } = require("../package.json");
const execSync = require("child_process").execSync;

execSync(
  `git-chglog --next-tag ${version} -o CHANGELOG.md && git add CHANGELOG.md`,
  {
    stdio: [0, 1, 2],
  }
);
