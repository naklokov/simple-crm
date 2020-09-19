import React from "react";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  ReadOutlined,
} from "@ant-design/icons";

import { urls } from ".";
import { logo } from "../assets/img";
import { PERMISSIONS } from "./permissions";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";

const { CLIENTS, TASKS, DEALS } = PERMISSIONS;

export const LOGO = logo;

export const MENU_ITEMS = [
  {
    id: "clients",
    title: "Клиенты",
    url: urls.clients.path,
    permissions: [CLIENTS.ADMIN, CLIENTS.GET, CLIENTS.GET_OWNER],
    icon: <UserOutlined />,
  },
  {
    id: "tasks",
    title: "Задачи",
    url: urls.tasks.path,
    permissions: [TASKS.ADMIN, TASKS.GET, TASKS.GET_OWNER],
    icon: <CalendarOutlined />,
  },
];

export const BREADCRUMB_ROUTES = {
  CLIENTS: [
    {
      path: "/",
      breadcrumbName: "Главная",
    },
    {
      path: urls.clients.path,
      breadcrumbName: "Клиенты",
    },
  ],
  TASKS: [
    {
      path: "/",
      breadcrumbName: "Главная",
    },
    {
      path: urls.tasks.path,
      breadcrumbName: "Задачи",
    },
  ],
};
