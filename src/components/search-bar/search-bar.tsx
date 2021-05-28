import React, { useCallback } from "react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  enterButton?: string;
  style?: React.CSSProperties;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder,
  className,
  onSearch,
  onChange,
  enterButton,
  style,
}) => {
  const [t] = useTranslation("searchBar");

  const handlePressEnter = useCallback(
    (event: React.KeyboardEvent) => {
      onSearch?.(value);
      event.preventDefault();
    },
    [value, onSearch]
  );

  return (
    <Input.Search
      className={className}
      style={style}
      placeholder={placeholder || t("placeholder")}
      onSearch={onSearch}
      onChange={onChange}
      onPressEnter={handlePressEnter}
      value={value}
      enterButton={enterButton}
      allowClear
    />
  );
};
