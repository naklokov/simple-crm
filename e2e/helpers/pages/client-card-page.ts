import { t, Selector } from "testcafe";

interface ClientCardProps {
  nameInput: SelectorOptions;
}

class ClientCard<ClientCardProps> {
  deleteButton: Selector;
  callButton: Selector;

  saveButton: Selector;
  cancelButton: Selector;

  returnButton: Selector;

  mainTab: Selector;
  contactTab: Selector;
  requisitesTab: Selector;
  priceListTab: Selector;
  tasksTab: Selector;
  commentsTab: Selector;
  docsTab: Selector;

  constructor() {
    this.deleteButton = Selector("button").withText("Удалить");
    this.callButton = Selector("button").withText("Звонок");

    this.saveButton = Selector("button").withAttribute("type", "submit");
    this.cancelButton = Selector("button").withText("Отменить");

    this.returnButton = Selector(".anticon-arrow-left");

    this.mainTab = Selector("div")
      .withAttribute("role", "tab")
      .withText("Главное");
    this.contactTab = Selector("div")
      .withAttribute("role", "tab")
      .withText("Контакты");
    this.requisitesTab = Selector("div")
      .withAttribute("role", "tab")
      .withText("Реквизиты");
    this.priceListTab = Selector("div")
      .withAttribute("role", "tab")
      .withText("Продукты и услуги");
    this.tasksTab = Selector("div")
      .withAttribute("role", "tab")
      .withText("Задачи");
    this.commentsTab = Selector("div")
      .withAttribute("role", "tab")
      .withText("Комментарии");
    this.docsTab = Selector("div")
      .withAttribute("role", "tab")
      .withText("Документы");
  }

  //   async selectFeature(number) {
  //     await t.click(this.importantFeaturesLabels.nth(number));
  //   }

  //   async clickSubmit() {
  //     await t.click(this.submitButton);
  //   }

  //   async typeName(name) {
  //     await t.typeText(this.nameInput, name);
  //   }
}

export default new Page();
