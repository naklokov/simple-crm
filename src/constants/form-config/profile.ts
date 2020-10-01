import { FieldProps, urls } from "..";
import { PERMISSIONS } from "../permissions";
import { DATE_FORMATS } from "../common";

const {
  PROFILE_INFO: { UPDATE, UPDATE_OWNER },
} = PERMISSIONS;

const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";

export const FIELDS: FieldProps[] = [
  {
    fieldCode: "fullName",
    fieldName: "Ф.И.О.",
    fieldDescription: "",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: REQUIRED_MESSAGE }],
    permissions: [UPDATE],
  },
  {
    fieldCode: "birthDate",
    fieldName: "Дата рождения",
    fieldDescription: "",
    type: "date",
    format: DATE_FORMATS.DATE,
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: REQUIRED_MESSAGE }],
    permissions: [UPDATE],
  },
  {
    fieldCode: "position",
    fieldName: "Должность",
    fieldDescription: "",
    type: "dictionary",
    readonly: false,
    disabled: false,
    rules: [],
    permissions: [UPDATE],
    _links: {
      self: {
        href: urls.dictionaries.position,
      },
    },
  },
  {
    fieldCode: "email",
    fieldName: "Email",
    fieldDescription: "",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [
      {
        type: "email",
        message: "Пожалуйста, введите корректный email",
      },
    ],
    permissions: [UPDATE],
  },
  {
    fieldCode: "location",
    fieldName: "Адрес",
    fieldDescription: "",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: REQUIRED_MESSAGE }],
    permissions: [UPDATE, UPDATE_OWNER],
  },
  {
    fieldCode: "aboutMe",
    fieldName: "О себе",
    type: "string",
    format: "textarea",
    placeholder: "Введите информацию о ваших увлечениях, хобби, интересах...",
    fieldDescription: "Максимум 2000 символов",
    readonly: false,
    permissions: [UPDATE, UPDATE_OWNER],
    disabled: false,
    rules: [{ max: 2000, message: "Превышена максимальная длина строки" }],
    span: { lg: 12, xl: 10 },
  },
];
