import { Role, Selector } from "testcafe";
import { host } from "../data/urls";

const user = Role(
  `${host}/crm/login`,
  async (t) => {
    const submitButton = Selector("button").withAttribute("type", "submit");

    await t
      .typeText("#login_username", "ukropchik.petrushechka@gmail.com")
      .typeText("#login_password", "ADMIN")
      .click(submitButton);
  },
  { preserveUrl: true }
);

export { user };
