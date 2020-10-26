import React from "react";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";

import { urls, http } from ".";
import { logo } from "../assets/img";
import { PERMISSIONS } from "./permissions";

const { CLIENTS, TASKS } = PERMISSIONS;

export const LOGO = logo;

export const MENU_ITEMS = [
  {
    id: "clients",
    title: "Клиенты",
    url: urls.clients.path,
    permissions: [CLIENTS["GET.ALL"]],
    icon: <UserOutlined />,
  },
  {
    id: "tasks",
    title: "Задачи",
    url: urls.tasks.path,
    permissions: [TASKS["GET.ALL"]],
    icon: <CalendarOutlined />,
  },
];

export const BREADCRUMB_ROUTES = {
  CLIENTS: [
    {
      path: urls.main.path,
      breadcrumbName: "Главная",
    },
    {
      path: urls.clients.path.replace(urls.main.path, ""),
      breadcrumbName: "Клиенты",
    },
  ],
  TASKS: [
    {
      path: urls.main.path,
      breadcrumbName: "Главная",
    },
    {
      path: urls.tasks.path.replace(urls.main.path, ""),
      breadcrumbName: "Задачи",
    },
  ],
};
