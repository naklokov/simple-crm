import { Role, Selector } from "testcafe";
import { LOGIN_URL } from "./constants";
import { loginInput, passwordInput, submitButton } from "./selectors";

const ADMIN_CREDENTIALS = {
  login: "kolbaskaosobaya@gmail.com",
  password: "ADM",
};

export const adminRole = Role(LOGIN_URL, async (t) => {
  await t
    .typeText(loginInput, ADMIN_CREDENTIALS.login)
    .typeText(passwordInput, ADMIN_CREDENTIALS.password)
    .click(submitButton);
});
