import { urls } from "..";
import { TabProps } from "../interfaces";

export const CLIENTS: { tabs: TabProps[] } = {
  tabs: [
    {
      tabCode: "clientsPersonal",
      tabName: "Все клиенты",
      tabDescription: "",
      type: "table",
      tableType: "server",
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
          width: "170px",
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
      ],
      _links: {
        self: {
          href: `${urls.clients.paging}?query=userProfileId=={{userProfileId}}`,
        },
        userProfileId: {
          href: urls.userProfiles.entity,
        },
      },
    },
  ],
};
