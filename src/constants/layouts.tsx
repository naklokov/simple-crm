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
  {
    id: "deals",
    title: "Сделки",
    url: urls.deals.path,
    permissions: [DEALS.ADMIN, DEALS.GET, DEALS.GET_OWNER],
    icon: <DollarOutlined />,
  },
  {
    id: "knowledge",
    title: "База знаний",
    url: urls.knowledge.path,
    permissions: [],
    icon: <ReadOutlined />,
  },
];
