import { TabProps } from "../interfaces";
import { urls } from "../index";
import { PERMISSIONS } from "../permissions";

const { CLIENTS } = PERMISSIONS;

interface UpperProps {
  tabs: TabProps[];
}

const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";
const PLACEHOLDER_DEFAULT = "Введите значение";

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
          span: 8,
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
          span: 8,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "phone",
          fieldName: "Телефон",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          span: 8,
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
          span: 8,
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
          span: 8,
          placeholder: PLACEHOLDER_DEFAULT,
          disabled: false,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "fax",
          fieldName: "Факс",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          span: 8,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "country",
          fieldName: "Страна",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          span: 8,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "webPage",
          fieldName: "Сайт",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          span: 8,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "managerId",
          fieldName: "Куратор",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          span: 8,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "dictionary",
          rules: [],
          permissions: [CLIENTS.ADMIN],
        },
        {
          fieldCode: "email",
          fieldName: "E-mail",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          span: 8,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
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
