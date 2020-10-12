import { Selector, t } from "testcafe";
import { userProfile } from "../config/test-data";

const submitButton = Selector("button").withAttribute("type", "submit");

export async function login() {
  await t
    .typeText("#login_username", userProfile.login)
    .typeText("#login_password", userProfile.password)
    .click(submitButton);
}
