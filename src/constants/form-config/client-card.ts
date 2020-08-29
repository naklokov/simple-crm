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
      type: 'container',
      fields: [
        {
          fieldCode: "fullName",
          fieldName: "Полное название",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "shortName",
          fieldName: "Сокращенное название",
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
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "phone",
          fieldName: "Телефон компании",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
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
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "webPage",
          fieldName: "Сайт компании",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "inn",
          fieldName: "ИНН",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
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
        }
      ],
      _links: {
        managerId: {
          href: urls.dictionaries.managers,
        },
      },
    },
    {
      tabCode: "contacts",
      tabName: "Контакты",
      tabDescription: "Контакты клиента",
      type: "table",
      actions: [
        {
          actionName: "Просмотр",
          actionType: "view",
          permissions: [CLIENTS.ADMIN, CLIENTS.DELETE, CLIENTS.DELETE_OWNER],
          href: urls.contacts.entity,
        },
        {
          actionName: "Удалить",
          actionType: "delete",
          permissions: [CLIENTS.ADMIN, CLIENTS.DELETE, CLIENTS.DELETE_OWNER],
          href: urls.contacts.entity,
        },],
      columns: [
        {
          columnName: "ФИО",
          columnCode: "FIO",
          columnType: "string",
          columnDescription: "ФИО контакта",
          sorter: true,
          columnActions: [
            {
              actionName: "",
              permissions: [CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER],
              actionType: "href",
              href: urls.clients.path,
            },
          ],
        },
        {
          columnName: "Телефон",
          columnCode: "phone",
          columnType: "string",
          columnDescription: "Телефон контакта компании",
          sorter: true,
          columnActions: [
            {
              actionName: "",
              permissions: [CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER],
              actionType: "href",
              href: urls.clients.path,
            },
          ],
        },
        {
          columnName: "E-mail",
          columnCode: "email",
          columnType: "string",
          columnDescription: "E-mail контакта компании",
          sorter: true,
          columnActions: [
            {
              actionName: "",
              permissions: [CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER],
              actionType: "href",
              href: urls.clients.path,
            },
          ],
        },
        {
          columnName: "Должность",
          columnCode: "position",
          columnType: "string",
          columnDescription: "Должность контакта компании",
          sorter: true,
          columnActions: [
            {
              actionName: "",
              permissions: [CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER],
              actionType: "href",
              href: urls.clients.path,
            },
          ],
        },
      ],
      _links: {}
    },
    {
      tabCode: "requisites",
      tabName: "Реквизиты",
      tabDescription: "Реквизиты клиента для оплаты счетов",
      type: "container",
      fields: [
        {
          fieldCode: "inn",
          fieldName: "ИНН",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "kpp",
          fieldName: "КПП",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "legalAddress",
          fieldName: "Юридический адрес",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "servicingBank",
          fieldName: "Банк",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "checkingAccount",
          fieldName: "Расчетный счет",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "correspondentAccount",
          fieldName: "Корреспондентский счет",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "chiefFio",
          fieldName: "ФИО руководителя",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "headPosition",
          fieldName: "Должность руководителя",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        }
      ],
      _links: {
        managerId: {
          href: urls.dictionaries.managers,
        },
      },
    },
    {
      tabCode: "priceList",
      tabName: "Продукты и услуги",
      tabDescription: "Продукты и услуги доступные в компании",
      type: "table",
      actions: [],
      columns: [
        {
          columnName: "Наименование",
          columnCode: "name",
          columnType: "string",
          columnDescription: "Наименование товара",
          sorter: true,
          columnActions: [
            {
              actionName: "",
              permissions: [CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER],
              actionType: "href",
              href: urls.clients.path,
            },
          ],
        },
        {
          columnName: "Описание",
          columnCode: "description",
          columnType: "string",
          columnDescription: "Описание товара",
          sorter: true,
          columnActions: [
            {
              actionName: "",
              permissions: [CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER],
              actionType: "href",
              href: urls.clients.path,
            },
          ],
        },
        {
          columnName: "Цена",
          columnCode: "price",
          columnType: "string",
          columnDescription: "Цена товара",
          sorter: true,
          editable: true,
          columnActions: [
            {
              actionName: "",
              permissions: [CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER],
              actionType: "href",
              href: urls.clients.path,
            },
          ],
        }
      ],
      _links: {}
    },
  ],
};

