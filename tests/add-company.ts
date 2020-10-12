import { ClientFunction, Selector } from "testcafe";
import { checkClientsPage } from "./helper/check-page";
import { login } from "./helper/login";
import { deleteAllCookies } from "./utils";

const clientDeleteAllCookies = ClientFunction(deleteAllCookies);

fixture`Getting Started`.page`http://localhost:3000/crm`;

test("create new client", async (t) => {
  await login();
  await checkClientsPage();
});
