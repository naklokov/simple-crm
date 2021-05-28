import React from "react";
import { Link as LinkRouter } from "react-router-dom";

interface LinkProps {
  url: string;
  title: string;
}

export const Link: React.FC<LinkProps> = ({ url, title }) => (
  <LinkRouter to={url}>{title}</LinkRouter>
);
