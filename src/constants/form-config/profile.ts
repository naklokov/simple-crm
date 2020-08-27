import { FieldProps, urls } from "..";
import { PERMISSIONS } from "../permissions";
import { TEXT_FORMATS, DATE_FORMATS } from "../common";

const { PROFILE_INFO } = PERMISSIONS;

const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";

export const FIELDS: FieldProps[] = [
  {
    fieldCode: "secondName",
    fieldName: "Фамилия",
    fieldDescription: "",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: REQUIRED_MESSAGE }],
    span: 8,
    permissions: [PROFILE_INFO.ADMIN],
  },
  {
    fieldCode: "firstName",
    fieldName: "Имя",
    fieldDescription: "",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: REQUIRED_MESSAGE }],
    span: 8,
    permissions: [PROFILE_INFO.ADMIN],
  },
  {
    fieldCode: "lastName",
    fieldName: "Отчество",
    fieldDescription: "",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: REQUIRED_MESSAGE }],
    span: 8,
    permissions: [PROFILE_INFO.ADMIN],
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
    span: 8,
    permissions: [PROFILE_INFO.ADMIN],
  },
  {
    fieldCode: "position",
    fieldName: "Должность",
    fieldDescription: "",
    type: "dictionary",
    readonly: false,
    disabled: false,
    rules: [],
    span: 8,
    permissions: [PROFILE_INFO.ADMIN],
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
    disabled: true,
    rules: [
      {
        type: "email",
        message: "Пожалуйста, введите корректный email",
      },
    ],
    span: 8,
    permissions: [PROFILE_INFO.ADMIN],
  },
  {
    fieldCode: "location",
    fieldName: "Адрес",
    fieldDescription: "",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: REQUIRED_MESSAGE }],
    span: 8,
    permissions: [PROFILE_INFO.ADMIN],
  },
  {
    fieldCode: "aboutMe",
    fieldName: "О себе",
    type: "string",
    format: TEXT_FORMATS.TEXT_AREA,
    placeholder: "Введите информацию о ваших увлечениях, хобби, интересах...",
    fieldDescription: "Максимум 2000 символов",
    readonly: false,
    permissions: [],
    disabled: false,
    rules: [{ max: 2000, message: "Превышена максимальная длина строки" }],
    span: 16,
  },
];
