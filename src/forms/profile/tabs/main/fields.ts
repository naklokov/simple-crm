import { urls, TEXT_FORMATS, DATE_FORMATS } from "../../../../constants";
import { FormFieldProps } from "../../../../constants";

export const getFields = (t: Function): FormFieldProps[] => [
  {
    id: "secondName",
    title: "Фамилия",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: t("rules.required") }],
    span: 8,
  },
  {
    id: "firstName",
    title: "Имя",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: t("rules.required") }],
    span: 8,
  },
  {
    id: "lastName",
    title: "Отчество",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: t("rules.required") }],
    span: 8,
  },
  {
    id: "birthDate",
    title: "Дата рождения",
    type: "date",
    format: DATE_FORMATS.DATE,
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: t("rules.required") }],
    span: 8,
  },
  {
    id: "position",
    title: "Должность",
    type: "dictionary",
    readonly: false,
    disabled: false,
    rules: [],
    url: urls.dictionaries.position,
    span: 8,
  },
  {
    id: "email",
    title: "Email",
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
  },
  {
    id: "location",
    title: "Адрес",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: t("rules.required") }],
    span: 8,
  },
  {
    id: "aboutMe",
    title: "О себе",
    type: "string",
    format: TEXT_FORMATS.TEXT_AREA,
    placeholder: "Введите информацию о ваших увлечениях, хобби, интересах...",
    description: "Максимум 2000 символов",
    readonly: false,
    disabled: false,
    rules: [],
    span: 16,
  },
];