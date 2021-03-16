import { Selector } from "testcafe";
import { user } from "../roles/role";
import clientsPage from "../page_model/clients";
import { mainPage } from "../data/urls";

fixture`Client add`.page(mainPage);

test("Fill client card", async (t) => {
  await t.useRole(user).navigateTo(mainPage);
  await t.click(Selector(".ant-btn").withText("добавить"));
});
