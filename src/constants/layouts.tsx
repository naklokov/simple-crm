import React from "react";
import { urls } from ".";
import { logo } from "../assets/img";
import { PERMISSIONS_SET } from "./permissions";
import { MenuItemProps } from "./interfaces";
import { CalendarIcon, UserIcon, DepartmentsIcon } from "../assets/icons";

export const LOGO = logo;

export const MENU_ITEMS: MenuItemProps[] = [
  {
    id: "clients",
    title: "Клиенты",
    type: "link",
    icon: <UserIcon />,
    permissions: PERMISSIONS_SET.CLIENT_GET,
    url: urls.clients.path,
  },
  {
    id: "tasks",
    title: "Задачи",
    type: "link",
    icon: <CalendarIcon colored={false} />,
    permissions: PERMISSIONS_SET.TASK_GET,
    url: urls.tasks.path,
  },
  {
    id: "departments",
    title: "Отделы",
    type: "drawer",
    icon: <DepartmentsIcon />,
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
