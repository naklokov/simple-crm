import React from "react";
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  ReadOutlined,
} from "@ant-design/icons";

import { urls } from ".";
import { logo } from "../assets/img";

export const TITLE = "БИЗНЕС РЕСУРС";

export const LOGO = logo;

export const MENUS_ELEMENTS = [
  {
    id: "clients",
    title: "Клиенты",
    url: urls.clients.path,
    icon: <UserOutlined />,
  },
  {
    id: "tasks",
    title: "Планы",
    url: urls.tasks.path,
    icon: <CalendarOutlined />,
  },
  {
    id: "deals",
    title: "Сделки",
    url: urls.deals.path,
    icon: <DollarOutlined />,
  },
  {
    id: "knowledge",
    title: "База знаний",
    url: urls.knowledge.path,
    icon: <ReadOutlined />,
  },
];
