import React, { useCallback, useContext } from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { HighlightTextWrapper } from "../../../../wrappers";
import { callTel, getConformedValue } from "../../../../utils";
import { SearchedAllContext } from "../../utils";
import { isNumber } from "lodash";

interface CallProps {
  phone: string;
}

export const Call = ({ phone }: CallProps) => {
  const [t] = useTranslation("table");
  const searched = useContext(SearchedAllContext);
  let searchedOptions = [searched];
  const isPhone = (val: string) => /^\+7[\d]+$/.test(val);

  if (isPhone(searched)) {
    searchedOptions = [searched, getConformedValue(searched)];
  }

  const handleCall = useCallback(() => {
    callTel(phone);
  }, [phone]);

  return (
    <Popconfirm
      title={t("actions.call.confirm")}
      onConfirm={handleCall}
      placement="left"
      key={phone}
    >
      <Button key={phone} style={{ padding: 0 }} type="link">
        <HighlightTextWrapper
          key={phone}
          text={getConformedValue(phone)}
          searched={searchedOptions}
        />
      </Button>
    </Popconfirm>
  );
};

export default Call;
