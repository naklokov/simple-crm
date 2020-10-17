import React, { useContext } from "react";
import { Link as LinkUI } from "react-router-dom";
import { HighlightTextWrapper } from "../../../../wrappers";
import { SearchedAllContext } from "../../utils";

interface LinkProps {
  title: string;
  href?: string;
}

export const Link = ({ title, href = "" }: LinkProps) => {
  const searched = useContext(SearchedAllContext);

  return (
    <LinkUI to={href}>
      <HighlightTextWrapper text={title} searched={[searched]} />
    </LinkUI>
  );
};

export default Link;
