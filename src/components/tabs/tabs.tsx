import React, { useState, useCallback } from "react";
import { Tabs as TabsUI, Tooltip } from "antd";
import { ModeType, TabProps } from "../../constants";

import style from "./tabs.module.scss";
import { useTranslation } from "react-i18next";

const { TabPane } = TabsUI;

interface TabsProps {
  className?: any;
  mainTab?: string;
  mode?: ModeType;
  tabs: TabProps[];
  formsMap: { [key: string]: (props: any) => JSX.Element };
}

export const Tabs = ({
  mode = "view",
  mainTab = "",
  tabs,
  formsMap,
  className,
  ...props
}: TabsProps) => {
  const defaultActiveKey = tabs?.[0]?.tabCode ?? "";
  const [activeTab, setActiveTab] = useState(defaultActiveKey);
  const [t] = useTranslation("tabs");

  const tab = tabs.find(({ tabCode }) => tabCode === activeTab);
  const Form = formsMap[activeTab];

  const handleChange = useCallback((id) => {
    setActiveTab(id);
  }, []);

  const isTabDisabled = (currentTab: string) =>
    currentTab !== mainTab && mode === "add";

  return (
    <div className={className}>
      <TabsUI
        className={style.tabs}
        defaultActiveKey={defaultActiveKey}
        onChange={handleChange}
      >
        {tabs.map(({ tabCode, tabName }) => {
          const disabled = isTabDisabled(tabCode);

          if (disabled) {
            return (
              <TabPane
                key={tabCode}
                tab={
                  <Tooltip title={t("tooltip.disabled")}>
                    <span>{tabName}</span>
                  </Tooltip>
                }
                disabled
              />
            );
          }

          return <TabPane key={tabCode} tab={tabName} />;
        })}
      </TabsUI>
      <div className={style.form}>
        <Form tab={tab} mode={mode} {...props} />
      </div>
    </div>
  );
};

export default Tabs;
