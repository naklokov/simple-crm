import React from "react";
import { urls } from "../../constants";
import { Breadcrumb } from "antd";

const { clients, profile, tasks, deals, knowledge } = urls;

export const URL_NAMES = [
  {
    title: "Главная",
    url: "/crm",
  },
  {
    title: "Клиенты",
    url: clients.path,
  },
  {
    title: "Профиль",
    url: profile.path,
  },
  {
    title: "Планы",
    url: tasks.path,
  },
  {
    title: "Сделки",
    url: deals.path,
  },
  {
    title: "База знаний",
    url: knowledge.path,
  },
];

export const findName = (href: string) => {
  const finded = URL_NAMES.find(({ url }) => href.endsWith(url));
  return finded?.title;
};

export const getBreadcrumbItems = (detailName: string) => {
  // делим по кастомному разделителю, чтобы сохранить слеши и удаляем пустые строки
  const crumbs = window.location.pathname
    .replace(/\//g, "|/")
    .split("|")
    .filter((item) => !!item);

  let href = "";

  return crumbs.map((item, idx) => {
    href += item;
    const isLast = idx === crumbs.length - 1 && idx > 0;
    // TODO переделать поиск по регулярке

    const name = isLast ? detailName : findName(href);

    return (
      <Breadcrumb.Item>
        <a href={href}>{name}</a>
      </Breadcrumb.Item>
    );
  });
};
