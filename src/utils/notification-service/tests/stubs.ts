import { TaskEntityProps } from "../../../constants";

export const TASKS_PAGING_STUB: {
  rows: TaskEntityProps[];
  totalCount: number;
} = {
  rows: [
    {
      _links: {
        clientId: {
          href: "/crm/rest/entity/CLIENTS/081f9a86-e412-4c41-a33c-e121a8dfe05f",
        },
        self: {
          href: "/crm/rest/entity/tasks/1d3d7ee6-9b5d-43b7-ae70-0554597dfbbc",
        },
        taskStatus: { href: "/crm/rest/dictionary/TASK_STATUS" },
        taskType: { href: "/crm/rest/dictionary/TASK_TYPE" },
        userProfileId: {
          href:
            "/crm/rest/entity/USERPROFILES/fa75dea2-e89e-4479-b5f6-f4ad5dd079b5",
        },
      },
      clientId: "081f9a86-e412-4c41-a33c-e121a8dfe05f",
      creationDate: "2021-02-08T06:40:00.000",
      historyId: "77deb236-6de1-401e-a809-babd8ca48276",
      id: "1d3d7ee6-9b5d-43b7-ae70-0554597dfbbc",
      isActive: true,
      isDeleted: false,
      isOwner: { DELETE: true, UPDATE: true },
      taskDescription: "клиент. прозвон (+0ч)",
      taskEndDate: "2021-02-03T09:40:00.000",
      taskStatus: "NOT_COMPLETED",
      taskType: "CALL",
      updateDate: "2020-12-15T17:56:52.389",
      userProfileId: "fa75dea2-e89e-4479-b5f6-f4ad5dd079b5",
    },
    {
      _links: {
        clientId: {
          href: "/crm/rest/entity/CLIENTS/562a5734-30e1-48fa-8c74-8fc923f91a61",
        },
        self: {
          href: "/crm/rest/entity/tasks/4d9c4b48-9c1b-4def-8a12-07897486f86e",
        },
        taskStatus: { href: "/crm/rest/dictionary/TASK_STATUS" },
        taskType: { href: "/crm/rest/dictionary/TASK_TYPE" },
        userProfileId: {
          href:
            "/crm/rest/entity/USERPROFILES/fa75dea2-e89e-4479-b5f6-f4ad5dd079b5",
        },
      },
      clientId: "562a5734-30e1-48fa-8c74-8fc923f91a61",
      creationDate: "2020-12-20T06:30:00.000",
      historyId: "61e10faf-36f2-45d0-8248-41911079e31a",
      id: "4d9c4b48-9c1b-4def-8a12-07897486f86e",
      isActive: true,
      isDeleted: false,
      isOwner: { DELETE: true, UPDATE: true },
      taskDescription: "ну что, как? (+0ч)",
      taskEndDate: "2020-12-15T09:30:00.000",
      taskStatus: "NOT_COMPLETED",
      taskType: "CALL",
      updateDate: "2020-12-15T17:56:52.487",
      userProfileId: "fa75dea2-e89e-4479-b5f6-f4ad5dd079b5",
    },
    {
      _links: {
        clientId: {
          href: "/crm/rest/entity/CLIENTS/96cc83cc-5422-47cc-879a-96969c9a9220",
        },
        self: {
          href: "/crm/rest/entity/tasks/a79935e0-f0c8-46fa-adeb-fa31c1a5805a",
        },
        taskStatus: { href: "/crm/rest/dictionary/TASK_STATUS" },
        taskType: { href: "/crm/rest/dictionary/TASK_TYPE" },
        userProfileId: {
          href:
            "/crm/rest/entity/USERPROFILES/fa75dea2-e89e-4479-b5f6-f4ad5dd079b5",
        },
      },
      clientId: "96cc83cc-5422-47cc-879a-96969c9a9220",
      creationDate: "2020-12-20T11:15:00.000",
      historyId: "b830379c-ca33-4263-8f3e-9be3096f7c85",
      id: "a79935e0-f0c8-46fa-adeb-fa31c1a5805a",
      isActive: true,
      isDeleted: false,
      isOwner: { DELETE: true, UPDATE: true },
      parentId: "fc10e295-3ccb-4cf5-b9a3-8f9c18eae632",
      taskDescription: "клиент. прозвон (+0ч)",
      taskEndDate: "2020-12-22T05:00:30.338",
      taskStatus: "NOT_COMPLETED",
      taskType: "CALL",
      updateDate: "2020-12-21T11:21:50.313",
      userProfileId: "fa75dea2-e89e-4479-b5f6-f4ad5dd079b5",
    },
  ],
  totalCount: 3,
};

export const TASKS_ENTITY_STUB = [
  {
    _links: {
      clientId: {
        href: "/crm/rest/entity/CLIENTS/96cc83cc-5422-47cc-879a-96969c9a9220",
      },
      self: {
        href: "/crm/rest/entity/tasks/a79935e0-f0c8-46fa-adeb-fa31c1a5805a",
      },
      taskStatus: { href: "/crm/rest/dictionary/TASK_STATUS" },
      taskType: { href: "/crm/rest/dictionary/TASK_TYPE" },
      userProfileId: {
        href:
          "/crm/rest/entity/USERPROFILES/fa75dea2-e89e-4479-b5f6-f4ad5dd079b5",
      },
    },
    clientId: "96cc83cc-5422-47cc-879a-96969c9a9220",
    creationDate: "2020-12-20T11:15:00.000",
    historyId: "b830379c-ca33-4263-8f3e-9be3096f7c85",
    id: "a79935e0-f0c8-46fa-adeb-fa31c1a5805a",
    isActive: true,
    isDeleted: false,
    isOwner: { DELETE: true, UPDATE: true },
    parentId: "fc10e295-3ccb-4cf5-b9a3-8f9c18eae632",
    taskDescription: "клиент. прозвон (+0ч)",
    taskEndDate: "2020-12-22T05:00:30.338",
    taskStatus: "NOT_COMPLETED",
    taskType: "CALL",
    updateDate: "2020-12-21T11:21:50.313",
    userProfileId: "fa75dea2-e89e-4479-b5f6-f4ad5dd079b5",
  },
  {
    _links: {
      clientId: {
        href: "/crm/rest/entity/CLIENTS/562a5734-30e1-48fa-8c74-8fc923f91a61",
      },
      self: {
        href: "/crm/rest/entity/tasks/4d9c4b48-9c1b-4def-8a12-07897486f86e",
      },
      taskStatus: { href: "/crm/rest/dictionary/TASK_STATUS" },
      taskType: { href: "/crm/rest/dictionary/TASK_TYPE" },
      userProfileId: {
        href:
          "/crm/rest/entity/USERPROFILES/fa75dea2-e89e-4479-b5f6-f4ad5dd079b5",
      },
    },
    clientId: "562a5734-30e1-48fa-8c74-8fc923f91a61",
    creationDate: "2020-12-20T06:30:00.000",
    historyId: "61e10faf-36f2-45d0-8248-41911079e31a",
    id: "4d9c4b48-9c1b-4def-8a12-07897486f86e",
    isActive: true,
    isDeleted: false,
    isOwner: { DELETE: true, UPDATE: true },
    taskDescription: "ну что, как? (+0ч)",
    taskEndDate: "2020-12-15T09:30:00.000",
    taskStatus: "NOT_COMPLETED",
    taskType: "CALL",
    updateDate: "2020-12-15T17:56:52.487",
    userProfileId: "fa75dea2-e89e-4479-b5f6-f4ad5dd079b5",
  },
];
