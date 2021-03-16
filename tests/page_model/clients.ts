import { t, Selector } from "testcafe";

class ClientsPage {
  pageHeaderComponent = Selector(".ant-page-header");
  tabsPane = Selector(".clients_tabs");
  tabsContent = Selector(".tabs_form");
  tableComponent = Selector("div.ant-table");
  paginationComponent = Selector("ul.ant-pagination");
  addClientButton = Selector(".ant-btn").withText("добавить");

  async clickAddClient() {
    await t.click(this.addClientButton);
  }
}

export default new ClientsPage();
