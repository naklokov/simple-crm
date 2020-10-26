import { TabProps, DrawerProps } from "../interfaces";
import { urls } from "../index";
import { PERMISSIONS_SET } from "../permissions";
import { DATE_FORMATS } from "../common";
import { phoneRule, vatRule } from "../../utils";

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
          permissions: PERMISSIONS_SET.TASK_UPDATE,
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
            { max: 2000, message: "Превышена максимальная длина строки" },
          ],
          permissions: PERMISSIONS_SET.TASK_UPDATE,
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
            { max: 2000, message: "Превышена максимальная длина строки" },
          ],
          permissions: PERMISSIONS_SET.TASK_UPDATE,
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
          permissions: [],
        },
        {
          actionName: "Выполнить",
          actionType: "done",
          permissions: PERMISSIONS_SET.TASK_UPDATE,
        },
      ],
      columns: [
        {
          columnName: "Дата и время",
          columnCode: "taskEndDate",
          columnType: "date",
          format: "DD.MM.YYYY HH:mm",
          columnDescription: "Запланированная дата для задачи",
          sorter: true,
          columnActions: [],
        },
        {
          columnName: "Описание",
          columnCode: "taskDescription",
          columnType: "string",
          columnDescription: "Подробное описание задачи",
          sorter: false,
          columnActions: [],
        },
        {
          columnName: "Примечание",
          columnCode: "note",
          columnType: "string",
          columnDescription: "Комментарий о выполнении задачи",
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
          permissions: PERMISSIONS_SET.CONTACT_UPDATE,
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
          rules: [{ required: true, message: REQUIRED_MESSAGE }, phoneRule],
          permissions: PERMISSIONS_SET.CONTACT_UPDATE,
        },
        {
          fieldCode: "email",
          fieldName: "Email",
          fieldDescription: "",
          type: "email",
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
          permissions: PERMISSIONS_SET.CONTACT_UPDATE,
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
          permissions: PERMISSIONS_SET.CONTACT_UPDATE,
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
          permissions: PERMISSIONS_SET.CONTACT_UPDATE,
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
          fieldCode: "shortName",
          fieldName: "Сокращенное название",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
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
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
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
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
        },
        {
          fieldCode: "phone",
          fieldName: "Телефон компании",
          fieldDescription: "",
          type: "phone",
          readonly: false,
          disabled: false,
          placeholder: PHONE_PLACEHOLDER,
          rules: [{ required: true, message: REQUIRED_MESSAGE }, phoneRule],
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
        },
        {
          fieldCode: "email",
          fieldName: "E-mail",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "email",
          rules: [
            {
              type: "email",
              message: EMAIL_MESSAGE,
            },
          ],
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
        },
        {
          fieldCode: "inn",
          fieldName: "ИНН",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [vatRule],
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
        },
        {
          fieldCode: "fullName",
          fieldName: "Полное название",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
        },
        {
          fieldCode: "webPage",
          fieldName: "Сайт компании",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "href",
          rules: [],
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
        },
        {
          fieldCode: "note",
          fieldName: "Примечание",
          fieldDescription: "",
          type: "string",
          format: "textarea",
          disabled: false,
          readonly: false,
          span: { lg: 12, xl: 12 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [],
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
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
          href: urls.dictionaries.userProfiles,
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
          permissions: [],
        },
        {
          actionName: "Удалить",
          actionType: "delete",
          permissions: PERMISSIONS_SET.CONTACT_DELETE,
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
              permissions: [],
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
              permissions: [],
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
          rules: [],
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
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
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
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
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
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
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
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
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
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
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
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
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
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
          permissions: PERMISSIONS_SET.CLIENT_UPDATE,
        },
      ],
      _links: {
        userProfileId: {
          href: urls.dictionaries.userProfiles,
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
          fixed: "left",
          width: 300,
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
          fixed: "right",
        },
      ],
      _links: {},
    },
  ],
};
