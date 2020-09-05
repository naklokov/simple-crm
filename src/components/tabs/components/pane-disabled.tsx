import React from "react";
import { Tabs, Tooltip } from "antd";
import { useTranslation } from "react-i18next";

interface PaneProps {
  code: string;
  name: string;
}

const { TabPane } = Tabs;

export const PaneDisabled = ({ code, name }: PaneProps) => {
  const [t] = useTranslation("tabs");

  return (
    <Tooltip title={t("tooltip.disabled")}>
      <TabPane tab={name} disabled />
    </Tooltip>
  );
};
