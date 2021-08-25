import React, { FC } from "react";
import { Button, Dropdown, Menu, Space } from "antd";
import { useTranslation } from "react-i18next";
import style from "./order.module.scss";
import { DownIcon } from "../../../../../../assets/icons";

type TDirection = "asc" | "desc";

interface OwnProps {
  value: TDirection;
  onChange: (order: TDirection) => void;
}

type Props = OwnProps;

const Order: FC<Props> = ({ value, onChange }) => {
  const [t] = useTranslation("clientCardComments");
  const orderLabel =
    value === "asc" ? t("order.label.first.old") : t("order.label.first.new");

  const handleSelect = (e: any) => {
    onChange(e?.key);
  };

  const menu = (
    <Menu onClick={handleSelect} selectedKeys={[value]}>
      <Menu.Item key="asc">{t("order.label.old")}</Menu.Item>
      <Menu.Item key="desc">{t("order.label.new")}</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button type="link" style={{ padding: 0 }}>
        <Space size="small">
          {orderLabel}
          <DownIcon className={style.icon} />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default Order;
