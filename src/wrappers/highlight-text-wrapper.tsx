import React from "react";
import Highlighter from "react-highlight-words";

interface HighlightTextWrapperProps {
  text: string;
  searched?: string[];
}

export const HighlightTextWrapper = ({
  text,
  searched = [],
}: HighlightTextWrapperProps) => (
  <Highlighter
    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
    searchWords={searched}
    autoEscape
    textToHighlight={text ? text.toString() : ""}
  />
);

export default HighlightTextWrapper;
