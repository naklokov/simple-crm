import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { getConformedValue } from "../../../../../../../../../../utils";

interface ItemProps {
  title?: string;
  fullName?: string;
  phone?: string;
}

export const Item: React.FC<ItemProps> = ({ title, fullName, phone }) => {
  const [t] = useTranslation("departments");
  return (
    <>
      {title && (
        <Typography.Text
          type="secondary"
          style={{ display: "block", fontSize: 12 }}
        >
          {title}
        </Typography.Text>
      )}
      {fullName && (
        <Typography.Text style={{ display: "block", marginTop: "4px" }} strong>
          {fullName}
        </Typography.Text>
      )}
      {phone && (
        <Typography.Text style={{ display: "block", marginTop: "4px" }}>
          {t("popover.phone.prefix", { phone: getConformedValue(phone) })}
        </Typography.Text>
      )}
    </>
  );
};
