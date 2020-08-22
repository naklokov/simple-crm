import React from "react";
import { Link as LinkUI } from "react-router-dom";
import { HighlightTextWrapper } from "../../../../wrappers";

interface LinkProps {
  title: string;
  searched: string;
  href?: string;
}

export const Link = ({ title, href = "", searched }: LinkProps) => {
  return (
    <LinkUI to={href}>
      <HighlightTextWrapper text={title} searched={searched} />
    </LinkUI>
  );
};

export default Link;
