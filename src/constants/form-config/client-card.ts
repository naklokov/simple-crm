import { TabProps, DrawerProps } from "../interfaces";
import { urls } from "../index";
import { PERMISSIONS_SET } from "../permissions";
import { DATE_FORMATS } from "../common";
import { checkActualDate, ogrnRule, phoneRule, vatRule } from "../../utils";
import { PHONE_PLACEHOLDER } from "../phone";

interface UpperProps {
  tabs: TabProps[];
  drawers: DrawerProps[];
}

interface LowerProps {
  tabs: TabProps[];
  drawers: DrawerProps[];
}

const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";
const EMAIL_MESSAGE = "Пожалуйста, введите корректный e-mail";
const URL_MESSAGE = "Пожалуйста, введите корректный url";
const KPP_MESSAGE = "Некорректный формат КПП";
const CHECKING_ACCOUNT_MESSAGE = "Некорректный формат расчётного счёта";
const BANK_BIK_ACCOUNT_MESSAGE = "Некорректный формат БИК банка";
const CORRESPONDENT_ACCOUNT_MESSAGE =
  "Некорректный формат корреспондентского счёта";
const PLACEHOLDER_DEFAULT = "Введите значение";
const getMaxLengthMessage = (len: number) =>
  `Превышена максимальная длина - ${len} символов`;

export const MAX_COMMENT_LENGTH = 10000;

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
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [
            { required: true, message: REQUIRED_MESSAGE },
            checkActualDate,
          ],
          permissions: [],
        },
        {
          fieldCode: "taskDescription",
          fieldName: "Описание",
          fieldDescription: "",
          type: "string",
          format: "textarea",
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [
            { max: 2000, message: "Превышена максимальная длина строки" },
          ],
          permissions: [],
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
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: "Введите комментарий по выполненной задаче",
          rules: [
            { max: 2000, message: "Превышена максимальная длина строки" },
          ],
          permissions: [],
        },
      ],
    },
  ],
  tabs: [
    {
      tabCode: "tasks",
      tabName: "Задачи",
      tabDescription: "Задачи связанные с клиентом",
      type: "table",
      actions: [
        {
          actionName: "Выполнить",
          actionType: "done",
          permissions: [],
        },
        {
          actionName: "Просмотр",
          actionType: "view",
          permissions: [],
        },
        {
          actionName: "Удалить",
          actionType: "delete",
          permissions: [],
        },
      ],
      columns: [
        {
          width: "250px",
          columnName: "Срок выполнения задачи",
          columnCode: "taskEndDate",
          columnType: "date",
          format: "DD.MM.YYYY HH:mm",
          columnDescription: "Дата запланированного выполнения задачи",
          sorter: true,
          columnActions: [],
        },
        {
          width: "250px",
          columnName: "Дата выполнения задачи",
          columnCode: "taskCompletedDate",
          columnType: "date",
          format: "DD.MM.YYYY HH:mm",
          columnDescription: "Дата фактического выполнения задачи",
          sorter: true,
          columnActions: [],
        },
        {
          columnName: "Описание",
          columnCode: "taskDescription",
          columnType: "string",
          columnDescription: "Подробное описание задачи",
          ellipsis: true,
          sorter: false,
          columnActions: [],
        },
        {
          columnName: "Комментарий",
          columnCode: "note",
          columnType: "string",
          columnDescription: "Комментарий о выполнении задачи",
          ellipsis: true,
          sorter: false,
          columnActions: [],
        },
      ],
      _links: {},
    },
    {
      tabCode: "comments",
      tabName: "Комментарии",
      tabDescription: "Комментарии о клиенте",
      type: "custom",
      _links: {},
    },
    {
      tabCode: "documents",
      tabName: "Документы",
      tabDescription: "Документы привязанные к клиенту",
      type: "custom",
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
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [
            { required: true, message: REQUIRED_MESSAGE },
            { max: 100, message: getMaxLengthMessage(100) },
          ],
          permissions: [],
        },
        {
          fieldCode: "phone",
          fieldName: "Телефон",
          fieldDescription: "",
          type: "phone",
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: PHONE_PLACEHOLDER,
          rules: [{ required: true, message: REQUIRED_MESSAGE }, phoneRule],
          permissions: [],
        },
        {
          fieldCode: "email",
          fieldName: "E-mail",
          fieldDescription: "",
          type: "email",
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [
            {
              type: "email",
              message: EMAIL_MESSAGE,
            },
          ],
          permissions: [],
        },
        {
          fieldCode: "position",
          fieldName: "Должность",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ max: 1000, message: getMaxLengthMessage(1000) }],
          permissions: [],
        },
        {
          fieldCode: "note",
          fieldName: "Примечание",
          fieldDescription: "",
          type: "string",
          format: "textarea",
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          rows: 2,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ max: 2000, message: getMaxLengthMessage(2000) }],
          permissions: [],
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
          rules: [
            { required: true, message: REQUIRED_MESSAGE },
            { max: 1000, message: getMaxLengthMessage(1000) },
          ],
          permissions: [],
        },
        {
          fieldCode: "city",
          fieldName: "Город",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ max: 100, message: getMaxLengthMessage(100) }],
          permissions: [],
        },
        {
          fieldCode: "address",
          fieldName: "Адрес",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ max: 2000, message: getMaxLengthMessage(2000) }],
          permissions: [],
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
          permissions: [],
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
          permissions: [],
        },
        {
          fieldCode: "inn",
          fieldName: "ИНН",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ required: true, message: REQUIRED_MESSAGE }, vatRule],
          permissions: [],
        },
        {
          fieldCode: "fullName",
          fieldName: "Полное название",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ max: 1000, message: getMaxLengthMessage(1000) }],
          permissions: [],
        },
        {
          fieldCode: "webPage",
          fieldName: "Сайт компании",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "href",
          rules: [{ pattern: /.+\..+/, message: URL_MESSAGE }],
          permissions: [],
        },
        {
          fieldCode: "activityField",
          fieldName: "Тип деятельности",
          fieldDescription: "",
          type: "dictionary",
          disabled: false,
          readonly: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          _links: {
            self: {
              href: urls.dictionaries.activityFields,
            },
          },
          permissions: [],
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
          fieldCode: "updateDate",
          fieldName: "Дата обновления",
          fieldDescription: "",
          type: "date",
          readonly: true,
          placeholder: PLACEHOLDER_DEFAULT,
          disabled: true,
          format: DATE_FORMATS.DATE,
          rules: [],
          permissions: [],
        },
        {
          fieldCode: "userProfileId",
          fieldName: "Куратор",
          type: "entity-lazy",
          titleField: "fullName",
          codeField: "id",
          readonly: false,
          disabled: false,
          rules: [],
          permissions: PERMISSIONS_SET.CLIENT_UPDATE_DEPARTMENT,
          _links: {
            self: {
              href: urls.userProfiles.paging,
            },
          },
        },
        {
          fieldCode: "note",
          fieldName: "Примечание",
          fieldDescription: "",
          type: "string",
          format: "textarea",
          disabled: false,
          readonly: false,
          span: { xl: 12, md: 12, lg: 12, sm: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ max: 10000, message: getMaxLengthMessage(10000) }],
          permissions: [],
        },
      ],
      _links: {
        self: {
          href: `${urls.clientCard.entity}/{{id}}`,
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
          permissions: [],
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
          rules: [vatRule],
          permissions: [],
        },
        {
          fieldCode: "ogrn",
          fieldName: "ОГРН",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [ogrnRule],
          permissions: [],
        },
        {
          fieldCode: "kpp",
          fieldName: "КПП",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [{ pattern: /^([0-9]{9})?$/, message: KPP_MESSAGE }],
          permissions: [],
        },
        {
          fieldCode: "legalAddress",
          fieldName: "Юридический адрес",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [
            { required: true, message: REQUIRED_MESSAGE },
            { max: 2000, message: getMaxLengthMessage(2000) },
          ],
          permissions: [],
        },
        {
          fieldCode: "servicingBank",
          fieldName: "Банк",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ max: 1000, message: getMaxLengthMessage(1000) }],
          permissions: [],
        },
        {
          fieldCode: "servicingBankBik",
          fieldName: "БИК банка",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [
            {
              pattern: /^[0-9]{9}$/,
              message: BANK_BIK_ACCOUNT_MESSAGE,
            },
          ],
          permissions: [],
        },
        {
          fieldCode: "checkingAccount",
          fieldName: "Расчётный счёт",
          fieldDescription: "",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          type: "string",
          rules: [
            {
              pattern: /^\d{20}$/,
              message: CHECKING_ACCOUNT_MESSAGE,
            },
          ],
          permissions: [],
        },
        {
          fieldCode: "correspondentAccount",
          fieldName: "Корреспондентский счёт",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [
            {
              pattern: /^\d{20}$/,
              message: CORRESPONDENT_ACCOUNT_MESSAGE,
            },
          ],
          permissions: [],
        },
        {
          fieldCode: "chiefFio",
          fieldName: "ФИО руководителя",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ max: 1000, message: getMaxLengthMessage(1000) }],
          permissions: [],
        },
        {
          fieldCode: "headPosition",
          fieldName: "Должность руководителя",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ max: 1000, message: getMaxLengthMessage(1000) }],
          permissions: [],
        },
      ],
      _links: {
        self: {
          href: `${urls.clientCard.entity}/{{id}}`,
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
        {
          columnName: "Примечание",
          columnCode: "note",
          columnType: "string",
          columnDescription: "Описание товара",
          sorter: false,
        },
        {
          columnName: "Единица измерения",
          columnCode: "positionUnit",
          columnType: "dictionary",
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
      _links: {
        positionUnit: {
          href: urls.dictionaries.positionUnit,
        },
      },
    },
  ],
};
