import { FieldProps, urls } from "../../constants";
import { phoneRule } from "../../utils";

const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";
const EMAIL_MESSAGE = "Пожалуйста, введите корректный e-mail";
const PLACEHOLDER_DEFAULT = "Введите значение";

export const NAME = "ADD_USER";

export const TITLE = "Добавление пользователя";

export const SUCCESS_MESSAGE = "Пользователь успешно добавлен";

export const MANAGER_ROLE_ID = "733397ea-8436-44d4-9beb-2bc9e674e9e8";

export const FIELDS: FieldProps[] = [
  {
    fieldCode: "fullName",
    fieldName: "Ф.И.О.",
    fieldDescription: "",
    type: "string",
    readonly: false,
    disabled: false,
    span: { xl: 24, md: 24, lg: 24, sm: 24 },
    placeholder: PLACEHOLDER_DEFAULT,
    rules: [{ required: true, message: REQUIRED_MESSAGE }],
    permissions: [],
  },
  {
    fieldCode: "email",
    fieldName: "E-mail",
    fieldDescription: "",
    type: "email",
    readonly: false,
    disabled: false,
    span: { xl: 24, md: 24, lg: 24, sm: 24 },
    placeholder: PLACEHOLDER_DEFAULT,
    rules: [
      { required: true, message: REQUIRED_MESSAGE },
      {
        type: "email",
        message: EMAIL_MESSAGE,
      },
    ],
    permissions: [],
  },
  {
    fieldCode: "phone",
    fieldName: "Телефон",
    fieldDescription: "",
    type: "phone",
    readonly: false,
    disabled: false,
    span: { xl: 24, md: 24, lg: 24, sm: 24 },
    placeholder: "+7 ",
    rules: [phoneRule],
    permissions: [],
  },
  {
    fieldCode: "departmentId",
    fieldName: "Отдел",
    type: "entity",
    titleField: "departmentName",
    codeField: "id",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: REQUIRED_MESSAGE }],
    permissions: [],
    span: { xl: 24, md: 24, lg: 24, sm: 24 },
    _links: {
      self: {
        href: urls.departments.entity,
      },
    },
  },
];
