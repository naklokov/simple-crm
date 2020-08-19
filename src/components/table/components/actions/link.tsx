import React from "react";
import { Link as LinkUI } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getHref } from "../../utils";

interface LinkProps {
  title: string;
  href?: string;
}

export const Link = ({ title, href = "" }: LinkProps) => {
  return <LinkUI to={href}>{title}</LinkUI>;
};

export default Link;
