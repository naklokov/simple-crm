import React, { useCallback, useState } from "react";
import cn from "classnames";
import { Input, Button, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import noop from "lodash/noop";

import style from "./header.module.scss";
import { ClearOutlined } from "@ant-design/icons";

interface HeaderProps {
  withSearch?: boolean;
  onSearch?: (value: string) => void;
  extra?: JSX.Element;
  onResetAllFilters: () => void;
}

export const Header = ({
  withSearch = false,
  onSearch = noop,
  extra,
  onResetAllFilters,
}: HeaderProps) => {
  const [t] = useTranslation("table");
  const [value, setValue] = useState("");

  const handleClear = useCallback(() => {
    onResetAllFilters();
    setValue("");
  }, [onSearch]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [value]
  );

  return (
    <div className={style.container}>
      {withSearch && (
        <div className={style.search}>
          <Input.Search
            className={cn(style.search, {
              [style.searchWide]: !window.isMobile,
            })}
            placeholder={t("search.all.placeholder")}
            onSearch={onSearch}
            onChange={handleChange}
            value={value}
            enterButton
          />
          {window.isMobile ? (
            <Tooltip title={t("search.all.clear")}>
              <Button
                icon={<ClearOutlined />}
                className={style.clear}
                onClick={handleClear}
              />
            </Tooltip>
          ) : (
            <Button className={style.clear} onClick={handleClear}>
              {t("search.all.clear")}
            </Button>
          )}
        </div>
      )}
      {extra}
    </div>
  );
};

export default Header;
