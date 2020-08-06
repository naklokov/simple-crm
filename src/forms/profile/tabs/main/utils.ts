import { FORM_NAME } from "./constansts";
import { urls } from "../../../../constants";
import { FormFieldProps } from "../../../../constants";

export const getFields = (t: Function): FormFieldProps[] => [
  {
    id: "secondName",
    title: "Фамилия",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: t("rules.required") }],
  },
  {
    id: "birthDate",
    title: "Дата рождения",
    type: "date",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: t("rules.required") }],
  },
  {
    id: "position",
    title: "Должность",
    type: "dictionary",
    readonly: false,
    disabled: true,
    rules: [{ required: true, message: t("rules.required") }],
    ref: urls.dictionaries.position,
  },
  {
    id: "firstName",
    title: "Имя",
    type: "string",
    readonly: true,
    disabled: false,
    rules: [{ required: true, message: t("rules.required") }],
  },
  {
    id: "email",
    title: "Имя",
    type: "string",
    readonly: true,
    disabled: false,
    rules: [
      { required: true, message: t("rules.required") },
      {
        type: "email",
        message: "Пожалуйста, введите корректный email",
      },
    ],
  },
  {
    id: "lastName",
    title: "Отчество",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: t("rules.required") }],
  },
  {
    id: "location",
    title: "Адрес",
    type: "string",
    readonly: false,
    disabled: false,
    rules: [{ required: true, message: t("rules.required") }],
  },
  {
    id: "aboutMe",
    title: "О себе",
    type: "string",
    format: "textarea",
    placeholder: "Введите информацию о ваших увлечениях, хобби, интересах...",
    description: "Максимум 2000 символов",
    readonly: false,
    disabled: false,
    rules: [],
  },
];

export const getForm = (t: Function) => ({
  name: FORM_NAME,
  title: t("title"),
  fields: getFields(t),
});
