import React from "react";
import { Card, Menu, Typography } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  ClusterOutlined,
  RightOutlined,
} from "@ant-design/icons";

import { urls } from ".";
import { logo } from "../assets/img";
import { PERMISSIONS_SET } from "./permissions";
import { MenuItemProps } from "./interfaces";

export const LOGO = logo;

export const MENU_ITEMS: MenuItemProps[] = [
  {
    id: "clients",
    title: "Клиенты",
    type: "link",
    icon: <UserOutlined />,
    permissions: PERMISSIONS_SET.CLIENT_GET,
    url: urls.clients.path,
  },
  {
    id: "tasks",
    title: "Задачи",
    type: "link",
    icon: <CalendarOutlined />,
    permissions: PERMISSIONS_SET.TASK_GET,
    url: urls.tasks.path,
  },
  {
    id: "departments",
    title: "Отделы",
    type: "drawer",
    icon: <ClusterOutlined />,
    permissions: PERMISSIONS_SET.DEPARTMENTS_GET,
  },
];

export const MAIN_ROUTE = [
  {
    path: urls.main.path,
    breadcrumbName: "Главная",
  },
];

export const BREADCRUMB_ROUTES = {
  PROFILE: [...MAIN_ROUTE],
  CLIENTS: [
    ...MAIN_ROUTE,
    {
      path: urls.clients.path.replace(urls.main.path, ""),
      breadcrumbName: "Клиенты",
    },
  ],
  TASKS: [
    ...MAIN_ROUTE,
    {
      path: urls.tasks.path.replace(urls.main.path, ""),
      breadcrumbName: "Задачи",
    },
  ],
  DEPARTMENTS: [
    ...MAIN_ROUTE,
    {
      path: urls.tasks.path.replace(urls.departments.path, ""),
      breadcrumbName: "Отделы",
    },
  ],
};
