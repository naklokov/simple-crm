import { TabProps } from "../interfaces";
import { urls } from "../index";
import { PERMISSIONS } from "../permissions";

const { CLIENTS } = PERMISSIONS;

interface UpperProps {
  tabs: TabProps[];
}

const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";

export const UPPER: UpperProps = {
  tabs: [
    {
      tabCode: "main",
      tabName: "Главное",
      tabDescription: "Подробная ингформация о клиенте...",
      fields: [
        {
          fieldCode: "address",
          fieldName: "Адрес",
          fieldDescription: "Адрес клиента",
          type: "string",
          readonly: false,
          disabled: false,
          span: 8,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.ADMIN],
        },
        {
          fieldCode: "phone",
          fieldName: "Телефон",
          fieldDescription: "Основной телефон клиента",
          type: "string",
          readonly: false,
          disabled: true,
          span: 8,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.ADMIN],
        },
        {
          fieldCode: "creationDate",
          fieldName: "Дата регистрации",
          fieldDescription: "Дата создания клиента",
          type: "date",
          readonly: true,
          disabled: true,
          span: 8,
          format: "DD.MM.yyyy",
          rules: [],
          permissions: [],
        },
        {
          fieldCode: "city",
          fieldName: "Город",
          fieldDescription: "Город клиента",
          type: "string",
          readonly: false,
          span: 8,
          disabled: false,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.ADMIN],
        },
        {
          fieldCode: "fax",
          fieldName: "Факс",
          fieldDescription: "Факс клиента",
          type: "string",
          readonly: false,
          disabled: false,
          span: 8,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.ADMIN],
        },
        {
          fieldCode: "country",
          fieldName: "Страна",
          fieldDescription: "Страна клиента",
          type: "string",
          readonly: false,
          disabled: false,
          span: 8,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.ADMIN],
        },
        {
          fieldCode: "webPage",
          fieldName: "Сайт",
          fieldDescription: "Сайт клиента",
          readonly: false,
          disabled: false,
          span: 8,
          type: "string",
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.ADMIN],
        },
        {
          fieldCode: "managerId",
          fieldName: "Куратор",
          fieldDescription: "Менеджер клиента",
          readonly: false,
          disabled: false,
          span: 8,
          type: "dictionary",
          rules: [],
          permissions: [CLIENTS.ADMIN],
        },
        {
          fieldCode: "email",
          fieldName: "E-mail",
          fieldDescription: "Электронная почта",
          readonly: false,
          disabled: false,
          span: 8,
          type: "string",
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.ADMIN],
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
