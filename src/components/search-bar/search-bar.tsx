import React, { useCallback } from "react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder,
  onSearch,
  onChange,
}) => {
  const [t] = useTranslation("searchBar");

  const handlePressEnter = useCallback(
    (event: React.KeyboardEvent) => {
      if (value) {
        onSearch?.(value);
        event.preventDefault();
      }
    },
    [value, onSearch]
  );

  return (
    <Input.Search
      placeholder={placeholder || t("placeholder")}
      onSearch={onSearch}
      onChange={onChange}
      onPressEnter={handlePressEnter}
      value={value}
      enterButton={t("button")}
      allowClear
    />
  );
};
