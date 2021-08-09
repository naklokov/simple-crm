import { Selector } from "testcafe";

// Страница ввода логина
export const loginInput = Selector("#login_username");
export const passwordInput = Selector("#login_password");
export const submitButton = Selector("button").withAttribute("type", "submit");

// Страница "Клиенты"
export const addClientButton = Selector("button").withText(
  "＋ Добавить клиента"
);

// Страница "Карточка клиента"

export const getTabByTitle = (title: string) =>
  Selector("div").withAttribute("role", "tab").withText(title);

export const getFieldByLabel = (label: string) =>
  Selector(".ant-form-item").withText(label);

export const selectOption = Selector(".ant-select-item");

export const messageSuccess = Selector(".ant-message-success");
