import { adminRole } from "../helpers/roles";
import { clearAuthCookies } from "../helpers/utils";
import {
  BASE_URL,
  STUB_CLIENT_DATA,
  TEXT_LOWER_1000_CHARS,
  TEXT_OVER_1000_CHARS,
  TEXT_OVER_100_CHARS,
  TEXT_OVER_2000_CHARS,
} from "../helpers/constants";
import { ClientCardPage, ClientsPage } from "../helpers/pages";
import { getFieldByLabel } from "../helpers/selectors";

const { URL = BASE_URL } = process.env;

const getValidationError = (length: number) =>
  `Превышена максимальная длина - ${length} символов`;

const validationErrorRequired = "Пожалуйста, заполните поле";

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/design?projectId=10003
fixture`Валидация`.beforeEach(async (t) => {
  clearAuthCookies();
  await t.useRole(adminRole).navigateTo(URL);
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
  await ClientCardPage.checkValidationMessage(label, getValidationError(1000));

  // вводим новое значение в поле длиной МЕНЕЕ 1000 символов
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), TEXT_LOWER_1000_CHARS)
    .click(ClientCardPage.saveButton);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // Удаляем клиента
  await ClientCardPage.deleteClient();
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
  await ClientCardPage.checkValidationMessage(label, getValidationError(1000));

  // вводим новое значение в поле длиной МЕНЕЕ 1000 символов
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), TEXT_LOWER_1000_CHARS)
    .click(ClientCardPage.saveButton);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // Удаляем клиента
  await ClientCardPage.deleteClient();
});

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/OLVETEST-T117
test("OLVETEST-T117", async (t) => {
  const label = "Город";

  // кликаем кнопку "+ Добавить клиента" на странице "Клиенты"
  await t.click(ClientsPage.addClientButton);

  // проверяем что выбрана таба "Главное"
  await ClientCardPage.isTabActive(ClientCardPage.mainTab);

  // Вводим стаб данные для клиента
  await ClientCardPage.addClient(STUB_CLIENT_DATA);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // вводим значение в поле длиной БОЛЕЕ 100 символов
  await t
    .typeText(getFieldByLabel(label), TEXT_OVER_100_CHARS, { paste: true })
    .click(ClientCardPage.saveButton);

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(label, getValidationError(100));

  // вводим новое значение в поле длиной МЕНЕЕ 100 символов
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), "Калуга")
    .click(ClientCardPage.saveButton);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // Удаляем клиента
  await ClientCardPage.deleteClient();
});

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/OLVETEST-T118
test("OLVETEST-T118", async (t) => {
  const label = "Адрес";

  // кликаем кнопку "+ Добавить клиента" на странице "Клиенты"
  await t.click(ClientsPage.addClientButton);

  // проверяем что выбрана таба "Главное"
  await ClientCardPage.isTabActive(ClientCardPage.mainTab);

  // Вводим стаб данные для клиента
  await ClientCardPage.addClient(STUB_CLIENT_DATA);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // вводим значение в поле длиной БОЛЕЕ 100 символов
  await t
    .typeText(getFieldByLabel(label), TEXT_OVER_2000_CHARS, { paste: true })
    .click(ClientCardPage.saveButton);

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(label, getValidationError(2000));

  // вводим новое значение в поле длиной МЕНЕЕ 100 символов
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(
      getFieldByLabel(label),
      "Адрес: 213564, г.Выдуманный, ул. Такая, д.1"
    )
    .click(ClientCardPage.saveButton);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // Удаляем клиента
  await ClientCardPage.deleteClient();
});

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/OLVETEST-T120
test("OLVETEST-T120", async (t) => {
  const label = "Юридический адрес";

  // кликаем кнопку "+ Добавить клиента" на странице "Клиенты"
  await t.click(ClientsPage.addClientButton);

  // проверяем что выбрана таба "Главное"
  await ClientCardPage.isTabActive(ClientCardPage.mainTab);

  // Вводим стаб данные для клиента
  await ClientCardPage.addClient(STUB_CLIENT_DATA);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // Выбрал табу реквизиты
  await t.click(ClientCardPage.requisitesTab);

  // вводим значение в поле длиной БОЛЕЕ 100 символов
  await t
    .typeText(getFieldByLabel(label), TEXT_OVER_2000_CHARS, { paste: true })
    .click(ClientCardPage.saveButton);

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(label, getValidationError(2000));

  // вводим новое значение в поле длиной МЕНЕЕ 100 символов
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), "г.Москва, Софийская набережная, д.29")
    .click(ClientCardPage.saveButton);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // Удаляем клиента
  await ClientCardPage.deleteClient();
});

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/OLVETEST-T122
test("OLVETEST-T122", async (t) => {
  const label = "Телефон компании";

  // кликаем кнопку "+ Добавить клиента" на странице "Клиенты"
  await t.click(ClientsPage.addClientButton);

  // проверяем что выбрана таба "Главное"
  await ClientCardPage.isTabActive(ClientCardPage.mainTab);

  // Вводим стаб данные для клиента
  await ClientCardPage.addClient({ ...STUB_CLIENT_DATA, phone: "" });

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(label, validationErrorRequired);

  // вводим невалидное значение в поле
  await t
    .typeText(getFieldByLabel(label), "`~@#$%ущыь     ^&*(   )_+fghm", {
      paste: true,
    })
    .click(ClientCardPage.saveButton);

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(
    label,
    "Некорректный формат телефона"
  );

  // вводим неполное значение в поле
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), "11111")
    .click(ClientCardPage.saveButton);

  await ClientCardPage.checkValidationMessage(
    label,
    "Некорректный формат телефона"
  );

  // вводим длинное значение в поле
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), "999999999999999")
    .click(ClientCardPage.saveButton);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // вводим корректное значение в поле
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), "111222333344")
    .click(ClientCardPage.saveButton);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // Удаляем клиента
  await ClientCardPage.deleteClient();
});

// https://olivje-group.atlassian.net/projects/OLVETEST?selectedItem=com.atlassian.plugins.atlassian-connect-plugin:com.kanoah.test-manager__main-project-page#!/testCase/OLVETEST-T123
test.skip("OLVETEST-T123", async (t) => {
  const label = "E-mail";

  // кликаем кнопку "+ Добавить клиента" на странице "Клиенты"
  await t.click(ClientsPage.addClientButton);

  // проверяем что выбрана таба "Главное"
  await ClientCardPage.isTabActive(ClientCardPage.mainTab);

  // Вводим стаб данные для клиента
  await ClientCardPage.addClient(STUB_CLIENT_DATA);

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // вводим значение в поле длиной БОЛЕЕ 100 символов
  await t
    .typeText(getFieldByLabel(label), "OneTwoThreegmail.com")
    .click(ClientCardPage.saveButton);

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(
    label,
    "Пожалуйста, введите корректный e-mail"
  );

  // вводим новое значение в поле длиной МЕНЕЕ 100 символов
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), "OneTwoThree@")
    .click(ClientCardPage.saveButton);

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(
    label,
    "Пожалуйста, введите корректный e-mail"
  );

  await ClientCardPage.clearFieldByLabel(label);
  await ClientCardPage.checkValidationMessage(
    label,
    "Пожалуйста, введите корректный e-mail",
    false
  );

  // вводим новое значение в поле длиной МЕНЕЕ 100 символов
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), "@mail.ru")
    .click(ClientCardPage.saveButton);

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(
    label,
    "Пожалуйста, введите корректный e-mail"
  );

  await ClientCardPage.clearFieldByLabel(label);
  await ClientCardPage.checkValidationMessage(
    label,
    "Пожалуйста, введите корректный e-mail",
    false
  );

  // вводим новое значение в поле длиной МЕНЕЕ 100 символов
  await ClientCardPage.clearFieldByLabel(label);
  await t
    .typeText(getFieldByLabel(label), "OneTwo..Three@yahoo.com")
    .click(ClientCardPage.saveButton);

  // проверяем наличие ошибки
  await ClientCardPage.checkValidationMessage(
    label,
    "Пожалуйста, введите корректный e-mail"
  );

  await ClientCardPage.clearFieldByLabel(label);
  await ClientCardPage.checkValidationMessage(
    label,
    "Пожалуйста, введите корректный e-mail",
    false
  );

  // Проверяем отображение сообщения об успешном обновлении клиента
  await ClientCardPage.checkMessageSuccess();

  // Удаляем клиента
  await ClientCardPage.deleteClient();
});
