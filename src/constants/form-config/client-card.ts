import { TabProps } from "../interfaces";
import { urls } from "../index";
import { PERMISSIONS } from "../permissions";

const { CLIENTS } = PERMISSIONS;

interface UpperProps {
  tabs: TabProps[];
}

const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";
const PLACEHOLDER_DEFAULT = "Введите значение";
const PHONE_PLACEHOLDER = "+7 (___) ___-__-__";

export const UPPER: UpperProps = {
  tabs: [
    {
      tabCode: "main",
      tabName: "Главное",
      tabDescription: "Подробная ингформация о клиенте...",
      fields: [
        {
          fieldCode: "shortName",
          fieldName: "Наименование",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "address",
          fieldName: "Адрес",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "phone",
          fieldName: "Телефон",
          fieldDescription: "",
          type: "phone",
          readonly: false,
          disabled: false,
          placeholder: PHONE_PLACEHOLDER,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "webPage",
          fieldName: "Сайт",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "email",
          fieldName: "E-mail",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "inn",
          fieldName: "ИНН",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "creationDate",
          fieldName: "Дата регистрации",
          fieldDescription: "",
          type: "date",
          readonly: true,
          placeholder: PLACEHOLDER_DEFAULT,
          disabled: true,
          format: "DD.MM.yyyy",
          rules: [],
          permissions: [],
        },
        {
          fieldCode: "city",
          fieldName: "Город",
          fieldDescription: "",
          type: "string",
          readonly: false,
          placeholder: PLACEHOLDER_DEFAULT,
          disabled: false,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
      ],
      _links: {
        managerId: {
          href: urls.dictionaries.managers,
        },
      },
    },
  ],
};
