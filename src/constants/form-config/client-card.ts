import { TabProps, DrawerProps } from "../interfaces";
import { urls } from "../index";
import { PERMISSIONS } from "../permissions";
import { DATE_FORMATS } from "../common";

const { CLIENTS, TASKS } = PERMISSIONS;

interface UpperProps {
  tabs: TabProps[];
  drawers: DrawerProps[];
}

interface LowerProps {
  tabs: TabProps[];
  drawers: DrawerProps[];
}

const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";
const EMAIL_MESSAGE = "Пожалуйста, введите корректный email";
const PLACEHOLDER_DEFAULT = "Введите значение";
const PHONE_PLACEHOLDER = "+7 (___) ___-__-__";

export const lower: LowerProps = {
  drawers: [
    {
      code: "task",
      name: "Задача",
      description: "Форма для просмотра и добавления задачи",
      fields: [
        {
          fieldCode: "taskEndDate",
          fieldName: "Дата и время",
          fieldDescription: "",
          type: "date",
          format: DATE_FORMATS.DATE_TIME,
          readonly: false,
          disabled: false,
          span: { md: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [TASKS.GET_OWNER, TASKS.GET, TASKS.ADMIN],
        },
        {
          fieldCode: "taskDescription",
          fieldName: "Описание",
          fieldDescription: "",
          type: "string",
          format: "textarea",
          readonly: false,
          disabled: false,
          span: { md: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [
            { min: 2, message: "Слишком малая длина строки" },
            { max: 2000, message: "Превышена максимальная длина строки" },
          ],
          permissions: [TASKS.GET_OWNER, TASKS.GET, TASKS.ADMIN],
        },
      ],
    },
    {
      code: "taskCompleted",
      name: "Выполнить задачу",
      description: "Форма для ввода комментария после выполнения задачи",
      fields: [
        {
          fieldCode: "note",
          fieldName: "Комментарий",
          fieldDescription: "",
          type: "string",
          format: "textarea",
          readonly: false,
          disabled: false,
          span: { md: 24 },
          placeholder: "Введите комментарий по выполненной задаче",
          rules: [
            { min: 2, message: "Слишком малая длина строки" },
            { max: 2000, message: "Превышена максимальная длина строки" },
          ],
          permissions: [TASKS.GET_OWNER, TASKS.GET, TASKS.ADMIN],
        },
      ],
    },
  ],
  tabs: [
    {
      tabCode: "comments",
      tabName: "Комментарии",
      tabDescription: "Комментарии о клиенте",
      type: "custom",
      _links: {},
    },
    {
      tabCode: "tasks",
      tabName: "Задачи",
      tabDescription: "Задачи связанные с клиентом",
      type: "table",
      actions: [
        {
          actionName: "Просмотр",
          actionType: "view",
          permissions: [CLIENTS.ADMIN, CLIENTS.DELETE, CLIENTS.DELETE_OWNER],
        },
        // {
        //   actionName: "Выполнить",
        //   actionType: "completed",
        //   permissions: [CLIENTS.ADMIN, CLIENTS.DELETE, CLIENTS.DELETE_OWNER],
        // },
      ],
      columns: [
        {
          columnName: "Дата и время",
          columnCode: "creationDate",
          columnType: "date",
          format: "DD.MM.YYYY",
          columnDescription: "Запланированная дата для задачи",
          sorter: true,
          columnActions: [],
        },
        {
          columnName: "Менеджер",
          columnCode: "managerId",
          columnType: "dictionary",
          columnDescription: "Менеджер который завёл задачу",
          sorter: true,
          columnActions: [],
        },
        {
          columnName: "Описание",
          columnCode: "description",
          columnType: "string",
          columnDescription: "Подробное описание задачи",
          sorter: false,
          columnActions: [],
        },
      ],
      _links: {},
    },
  ],
};

export const upper: UpperProps = {
  drawers: [
    {
      code: "contact",
      name: "Контакт",
      description: "Боковая форма просмотра и добавления контакта",
      fields: [
        {
          fieldCode: "fullName",
          fieldName: "Ф.И.О.",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          span: { md: 24 },
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
          span: { md: 24 },
          placeholder: PHONE_PLACEHOLDER,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "email",
          fieldName: "Email",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          span: { md: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [
            {
              type: "email",
              message: EMAIL_MESSAGE,
            },
          ],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "position",
          fieldName: "Должность",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          span: { md: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "note",
          fieldName: "Примечание",
          fieldDescription: "",
          type: "string",
          format: "textarea",
          readonly: false,
          disabled: false,
          span: { md: 24 },
          rows: 2,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
      ],
    },
  ],
  tabs: [
    {
      tabCode: "main",
      tabName: "Главное",
      tabDescription: "Подробная ингформация о клиенте...",
      type: "container",
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
          type: "phone",
          readonly: false,
          disabled: false,
          placeholder: PHONE_PLACEHOLDER,
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
          fieldCode: "city",
          fieldName: "Город",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
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
          fieldCode: "activityField",
          fieldName: "Сфера деятельности",
          fieldDescription: "",
          type: "dictionary",
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
        },
      ],
      _links: {
        userProfileId: {
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
        },
        {
          actionName: "Удалить",
          actionType: "delete",
          permissions: [CLIENTS.ADMIN, CLIENTS.DELETE, CLIENTS.DELETE_OWNER],
          href: urls.contacts.entity,
        },
      ],
      columns: [
        {
          columnName: "Ф.И.О.",
          columnCode: "fullName",
          columnType: "string",
          columnDescription: "Полное имя",
          sorter: true,
          columnActions: [],
        },
        {
          columnName: "Телефон",
          columnCode: "phone",
          columnType: "string",
          columnDescription: "Телефон контакта компании",
          sorter: false,
          columnActions: [
            {
              actionType: "call",
              actionName: "",
              permissions: [CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER],
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
              actionType: "email",
            },
          ],
        },
        {
          columnName: "Должность",
          columnCode: "position",
          columnType: "string",
          columnDescription: "Должность контакта компании",
          sorter: true,
          columnActions: [],
        },
        {
          columnName: "Примечание",
          columnCode: "note",
          columnType: "string",
          columnDescription: "Примечание о контакте",
          sorter: false,
          columnActions: [],
        },
      ],
      _links: {},
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
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [],
          permissions: [CLIENTS.GET_OWNER, CLIENTS.GET, CLIENTS.ADMIN],
        },
        {
          fieldCode: "legalAddress",
          fieldName: "Юридический адрес",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
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
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
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
        },
      ],
      _links: {
        userProfileId: {
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
          columnName: "Наименование товара",
          columnCode: "positionName",
          columnType: "string",
          columnDescription: "Наименование товара",
          sorter: true,
        },
        {
          columnName: "Описание",
          columnCode: "positionDescription",
          columnType: "string",
          columnDescription: "Описание товара",
          sorter: false,
        },
        // {
        //   columnName: "Единица измерения",
        //   columnCode: "positionUnit",
        //   columnType: "dictionary",
        //   columnDescription: "Описание товара",
        //   sorter: false,
        // },
        {
          columnName: "Примечание",
          columnCode: "note",
          columnType: "string",
          columnDescription: "Описание товара",
          sorter: false,
        },
        {
          columnName: "Цена",
          columnCode: "cost",
          columnType: "number",
          columnDescription: "Цена товара",
          format: "currency",
          sorter: true,
          editable: true,
        },
      ],
      _links: {},
    },
  ],
};
