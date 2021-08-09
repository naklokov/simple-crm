import { adminRole } from "../helpers/roles";
import { clearAuthCookies } from "../helpers/utils";
import {
  BASE_URL,
  STUB_CLIENT_DATA,
  TEXT_LOWER_1000_CHARS,
  TEXT_OVER_1000_CHARS,
} from "../helpers/constants";
import { ClientCardPage, ClientsPage } from "../helpers/pages";
import { getFieldByLabel } from "../helpers/selectors";

const validationErrorMax = "Превышена максимальная длина - 1000 символов";
const validationErrorRequired = "Пожалуйста, заполните поле";

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/design?projectId=10003
fixture`Валидация`.beforeEach(async (t) => {
  clearAuthCookies();
  await t.useRole(adminRole).navigateTo(BASE_URL);
});

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/OLVETEST-T115
test("OLVETEST-T115", async (t) => {
  const label = "Полное название";

  // кликаем кнопку "+ Добавить клиента" на странице "Клиенты"
  await t.click(ClientsPage.addClientButton);

  // проверяем что выбрана таба "Главное"
  await ClientCardPage.isTabActive(ClientCardPage.mainTab);

  // Вводим стаб данные для клиента
  await ClientCardPage.addClient(STUB_CLIENT_DATA);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // вводим значение в поле длиной БОЛЕЕ 1000 символов
  await t
    .typeText(getFieldByLabel(label), TEXT_OVER_1000_CHARS, { paste: true })
    .click(ClientCardPage.saveButton);

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(label, validationErrorMax);

  // вводим новое значение в поле длиной МЕНЕЕ 1000 символов
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), TEXT_LOWER_1000_CHARS)
    .click(ClientCardPage.saveButton);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // Удаляем клиента
  await t.click(ClientCardPage.deleteButton);
});

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/OLVETEST-T115
test("OLVETEST-T116", async (t) => {
  const label = "Сокращенное название";

  // кликаем кнопку "+ Добавить клиента" на странице "Клиенты"
  await t.click(ClientsPage.addClientButton);

  // проверяем что выбрана таба "Главное"
  await ClientCardPage.isTabActive(ClientCardPage.mainTab);

  // вводим стаб данные для клиента с пустым значением в
  await ClientCardPage.addClient({ ...STUB_CLIENT_DATA, shortName: "" });

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(label, validationErrorRequired);

  // вводим в поле пробелы
  await t.typeText(getFieldByLabel(label), "      ");
  await t.click(ClientCardPage.saveButton);

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(label, validationErrorRequired);

  // вводим значение в поле длиной БОЛЕЕ 1000 символов
  await t
    .typeText(getFieldByLabel(label), TEXT_OVER_1000_CHARS, { paste: true })
    .click(ClientCardPage.saveButton);

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(label, validationErrorMax);

  // вводим новое значение в поле длиной МЕНЕЕ 1000 символов
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), TEXT_LOWER_1000_CHARS)
    .click(ClientCardPage.saveButton);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // Удаляем клиента
  await t.click(ClientCardPage.deleteButton);
});
