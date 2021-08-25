import React from "react";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import { HIGHLIGHT_FILL, State } from "../constants";

interface HighlightTextWrapperProps {
  text: string;
  searched?: string[];
  loading?: boolean;
}

export const HighlightTextWrapper: React.FC<HighlightTextWrapperProps> = ({
  text,
  searched = [],
  loading = false,
}) => {
  if (loading) {
    return (
      <Highlighter
        searchWords={[]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    );
  }

  return (
    <Highlighter
      highlightClassName={HIGHLIGHT_FILL}
      searchWords={searched}
      autoEscape
      textToHighlight={text ? text.toString() : ""}
    />
  );
};

export default HighlightTextWrapper;
