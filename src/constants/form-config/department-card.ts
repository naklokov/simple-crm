import { urls } from "..";
import { DrawerProps, TabProps } from "../interfaces";
import { USER_ROLES_ID } from "../permissions";

const PLACEHOLDER_DEFAULT = "Введите значение";
const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";
const getMaxLengthMessage = (len: number) =>
  `Превышена максимальная длина - ${len} символов`;

export const FORM: { drawers: DrawerProps[]; tabs: TabProps[] } = {
  drawers: [
    {
      code: "chiefChangeRoleDrawer",
      name: "",
      description: "",
      fields: [
        {
          fieldCode: "userProfileId",
          fieldName: "Ф.И.О.",
          fieldDescription: "",
          type: "entity",
          titleField: "fullName",
          codeField: "id",
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: "Введите ФИО сотрудника",
          rules: [],
          permissions: [],
          _links: {
            self: {
              href: `${urls.userProfiles.entity}?query=departmentId=={{departmentId}};userRoleId=out=(${USER_ROLES_ID.ROLE_ADMIN},${USER_ROLES_ID.ROLE_DEPT_CHIEF})`,
            },
          },
        },
      ],
    },
    {
      code: "deputyChangeRoleDrawer",
      name: "",
      description: "",
      fields: [
        {
          fieldCode: "userProfileId",
          fieldName: "Ф.И.О.",
          fieldDescription: "",
          type: "entity",
          titleField: "fullName",
          codeField: "id",
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: "Введите ФИО сотрудника",
          rules: [],
          permissions: [],
          _links: {
            self: {
              href: `${urls.userProfiles.entity}?query=departmentId=={{departmentId}};userRoleId=out=(${USER_ROLES_ID.ROLE_ADMIN},${USER_ROLES_ID.ROLE_SUB_DEPT_CHIEF},${USER_ROLES_ID.ROLE_DEPT_CHIEF})`,
            },
          },
        },
      ],
    },
  ],
  tabs: [
    {
      tabCode: "staff",
      tabName: "Сотрудники",
      tabDescription: "Информация о сотрудниках",
      type: "table",
      actions: [],
      columns: [
        {
          columnName: "ФИО",
          columnCode: "fullName",
          columnType: "string",
          sorter: true,
          filterable: true,
          columnDescription: "ФИО пользователя",
          columnActions: [
            {
              actionName: "",
              permissions: [],
              actionType: "href",
              href: urls.profile.path,
            },
          ],
        },
        {
          columnName: "Телефон",
          columnCode: "phone",
          columnType: "string",
          columnDescription: "Телефон",
          filterable: true,
          columnActions: [
            {
              actionType: "call",
              actionName: "",
              permissions: [],
            },
          ],
          sorter: false,
        },
        {
          columnName: "Дата рождения",
          columnCode: "creationDate",
          columnType: "date",
          format: "DD.MM.YYYY",
          filterable: true,
          sorter: true,
          columnDescription: "Дата рождения",
        },
        {
          columnName: "E-mail",
          columnCode: "email",
          columnType: "string",
          columnDescription: "E-mail контакта компании",
          filterable: true,
          sorter: true,
          isJsonField: false,
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
          columnType: "dictionary",
          columnDescription: "Должность",
          isJsonField: true,
          sorter: false,
          filterable: true,
        },
      ],
      _links: {
        self: {
          href: `${urls.userProfiles.paging}?query=departmentId=={{departmentId}}`,
        },
        id: {
          href: `${urls.userProfiles.entity}?query=departmentId=={{departmentId}}`,
        },
        position: {
          href: urls.dictionaries.position,
        },
      },
    },
    {
      tabCode: "clients",
      tabName: "Клиенты",
      tabDescription: "Информация о клиентах отдела",
      type: "table",
      actions: [],
      columns: [
        {
          columnName: "Наименование",
          columnCode: "shortName",
          columnType: "string",
          columnDescription: "Наименование",
          width: "30%",
          sorter: true,
          filterable: true,
          columnActions: [
            {
              actionName: "",
              permissions: [],
              actionType: "href",
              href: urls.clients.path,
            },
          ],
        },
        {
          columnName: "Телефон",
          columnCode: "phone",
          columnType: "string",
          columnDescription: "Телефон",
          filterable: true,
          columnActions: [
            {
              actionType: "call",
              actionName: "",
              permissions: [],
            },
          ],
          sorter: false,
        },
        {
          columnName: "Город",
          columnCode: "city",
          columnType: "string",
          width: "15%",
          columnDescription: "Город",
          filterable: true,
          sorter: true,
        },
        {
          columnName: "Дата регистрации",
          columnCode: "creationDate",
          columnType: "date",
          filterable: true,
          format: "DD.MM.YYYY",
          sorter: true,
          columnDescription: "Дата регистрации",
        },
        {
          columnName: "ИНН",
          columnCode: "inn",
          columnType: "string",
          columnDescription: "ИНН",
          filterable: true,
          sorter: false,
        },
        {
          columnName: "Тип деятельности",
          columnCode: "activityField",
          columnType: "dictionary",
          columnDescription: "Тип деятельности клиента",
          isJsonField: true,
          sorter: false,
          filterable: true,
        },
        {
          columnName: "Куратор",
          columnCode: "userProfileId",
          columnType: "entity",
          titleField: "fullName",
          valueField: "id",
          sorter: false,
          filterable: true,
          columnDescription: "Куратор компании",
        },
      ],
      _links: {
        self: {
          href: `${urls.departments.entity}/{{departmentId}}/child/clients/paging`,
        },
        position: {
          href: urls.dictionaries.position,
        },
        userProfileId: {
          href: `${urls.userProfiles.entity}?query=departmentId=={{departmentId}}`,
        },
        activityField: {
          href: urls.dictionaries.activityFields,
        },
      },
    },
    {
      tabCode: "information",
      tabName: "Информация",
      tabDescription: "Информация об отделе",
      type: "custom",
      fields: [
        {
          fieldCode: "departmentName",
          fieldName: "Название отдела",
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
      ],
      _links: {
        self: {
          href: `${urls.departments.entity}/{{departmentId}}`,
        },
        userProfileId: {
          href: urls.userProfiles.entity,
        },
      },
    },
  ],
};
