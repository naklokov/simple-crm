import React, { useCallback, useState } from "react";
import { Button } from "antd";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { FILTER_ALL_NAME } from "../../constants";
import { useTableServerPagingParams } from "../../utils";
import { SearchBar } from "../../../search-bar";
import { getValueFromRsql } from "../../../../utils";

import style from "./table-header.module.scss";

interface TableHeaderProps {
  onSearch?: (searched: string) => void;
  onClearAll?: () => void;
  extra: React.ReactNode;
  withSearch?: boolean;
  searchPlaceholder?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  onSearch,
  onClearAll,
  extra,
  withSearch = false,
  searchPlaceholder,
}) => {
  const [t] = useTranslation("tableHeader");
  const { filters } = useTableServerPagingParams();
  const [value, setValue] = useState(
    getValueFromRsql(filters?.[FILTER_ALL_NAME] ?? "")
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target?.value ?? "");
  }, []);

  const handleSearch = useCallback(
    (inputSearch) => {
      onSearch?.(inputSearch);
    },
    [onSearch]
  );

  const handleClearAll = useCallback(() => {
    setValue("");
    onClearAll?.();
  }, [onClearAll]);

  return (
    <div className={style.container}>
      {withSearch && (
        <div className={style.search}>
          <SearchBar
            value={value}
            placeholder={searchPlaceholder}
            onChange={handleChange}
            onSearch={handleSearch}
          />
          {onClearAll && (
            <Button
              className={cn(style.searchClear, {
                [style.searchClearWithExtra]: extra,
              })}
              onClick={handleClearAll}
            >
              {t("button.clear.all")}
            </Button>
          )}
        </div>
      )}
      {extra && <div className={style.extra}>{extra}</div>}
    </div>
  );
};
