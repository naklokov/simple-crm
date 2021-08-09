import { Selector } from "testcafe";

class ClientsPage {
  addClientButton: Selector;

  myClientsTab: Selector;

  allClientsTab: Selector;

  constructor() {
    this.addClientButton = Selector("button").withText("＋ Добавить клиента");

    this.myClientsTab = Selector("div")
      .withAttribute("role", "tab")
      .withText("Мои клиенты");
    this.allClientsTab = Selector("div")
      .withAttribute("role", "tab")
      .withText("Все клиенты");
  }
}

export default new ClientsPage();
