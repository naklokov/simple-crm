import React from "react";
import Highlighter from "react-highlight-words";

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
      highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
      searchWords={searched}
      autoEscape
      textToHighlight={text ? text.toString() : ""}
    />
  );
};

export default HighlightTextWrapper;
