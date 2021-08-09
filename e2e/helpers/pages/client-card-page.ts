import { t, Selector } from "testcafe";
import { getFieldByLabel, messageSuccess, selectOption } from "../selectors";

export type FieldType = "text" | "dictionary";

export interface FieldsInfoProps {
  [key: string]: {
    label: string;
    type: FieldType;
  };
}

const FIELDS_INFO: FieldsInfoProps = {
  shortName: {
    label: "Сокращенное название",
    type: "text",
  },
  phone: {
    label: "Телефон компании",
    type: "text",
  },
  inn: {
    label: "ИНН",
    type: "text",
  },
  activityField: {
    label: "Тип деятельности",
    type: "dictionary",
  },
};

class ClientCardPage {
  deleteButton: Selector;

  popoverConfirm: Selector;

  popoverCancel: Selector;

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
    this.popoverConfirm = Selector(".ant-btn-sm").withText("OK");
    this.popoverCancel = Selector(".ant-btn-sm").withText("Отмена");
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

  clearFieldByLabel = async (label: string) => {
    await t.click(getFieldByLabel(label)).pressKey("ctrl+a delete");
  };

  addClient = async (fields: any) => {
    Object.keys(fields).forEach(async (key) => {
      if (fields[key]) {
        if (FIELDS_INFO?.[key]?.type === "dictionary") {
          await t
            .click(getFieldByLabel(FIELDS_INFO?.[key]?.label))
            .click(selectOption.withText(fields[key]));
          return;
        }

        await t.typeText(
          getFieldByLabel(FIELDS_INFO?.[key]?.label),
          fields[key]
        );
      }
    });

    await t.click(this.saveButton);
  };

  clickSave = async () => {
    await t.click(this.saveButton);
  };

  checkMessageSuccess = async () => {
    await t
      .expect(messageSuccess.textContent)
      .contains("Информация о клиенте обновлена");
  };

  checkValidationMessage = async (
    label: string,
    message: string,
    ok: boolean = true
  ) => {
    if (ok) {
      await t.expect(getFieldByLabel(label).textContent).contains(message);
    } else {
      await t.expect(getFieldByLabel(label).textContent).notContains(message);
    }
  };

  isTabActive = async (tab: Selector) => {
    const activeTab = tab.withAttribute("aria-selected", "true");
    await t.expect(activeTab.exists).ok();
  };

  deleteClient = async () => {
    await t.click(this.deleteButton).click(this.popoverConfirm);
  };
}

export default new ClientCardPage();
