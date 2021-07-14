import { urls } from "..";
import { TabProps } from "../interfaces";

export const CLIENTS: { tabs: TabProps[] } = {
  tabs: [
    {
      tabCode: "clientsPersonal",
      tabName: "Мои клиенты",
      tabDescription: "",
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
          sorter: false,
          isJsonField: true,
          filterable: true,
        },
      ],
      _links: {
        self: {
          href: `${urls.clients.paging}?query=userProfileId=={{userProfileId}}`,
        },
        userProfileId: {
          href: urls.userProfiles.entity,
        },
        activityField: {
          href: urls.dictionaries.activityFields,
        },
      },
    },
    {
      tabCode: "clientsAll",
      tabName: "Все клиенты",
      tabDescription: "",
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
          href: urls.clients.paging,
        },
        userProfileId: {
          href: urls.userProfiles.entity,
        },
        activityField: {
          href: urls.dictionaries.activityFields,
        },
      },
    },
  ],
};
