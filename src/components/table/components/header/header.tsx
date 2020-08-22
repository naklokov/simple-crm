import React, { useCallback, useState } from "react";
import { Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import noop from "lodash/noop";

import style from "./header.module.scss";

interface HeaderProps {
  withSearch?: boolean;
  onSearch?: (value: string) => void;
  button?: JSX.Element;
}

export const Header = ({
  withSearch = false,
  onSearch = noop,
  button,
}: HeaderProps) => {
  const [t] = useTranslation("table");
  const [value, setValue] = useState("");

  const handleClear = useCallback(() => {
    onSearch("");
    setValue("");
  }, [onSearch]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [value]
  );

  return (
    <div>
      {withSearch && (
        <React.Fragment>
          <Input.Search
            className={style.filter}
            placeholder={t("search.all.placeholder")}
            onSearch={onSearch}
            onChange={handleChange}
            value={value}
            enterButton
          />
          <Button className={style.clear} onClick={handleClear}>
            {t("search.all.clear")}
          </Button>
        </React.Fragment>
      )}
      {button}
    </div>
  );
};

export default Header;
