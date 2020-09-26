import React, { useState, useCallback, useEffect } from "react";
import { Tabs as TabsUI, Tooltip } from "antd";
import { ModeType, TabProps } from "../../constants";

import style from "./tabs.module.scss";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { getActiveQueryTab, setActiveQueryTab } from "./utils";

const { TabPane } = TabsUI;

interface TabsProps {
  className?: any;
  mainTab?: string;
  mode?: ModeType;
  tabs: TabProps[];
  position?: string;
  formsMap: { [key: string]: (props: any) => JSX.Element };
}

export const Tabs = ({
  mode = "view",
  mainTab = "",
  tabs,
  formsMap,
  className,
  position = "",
  ...props
}: TabsProps) => {
  const queryParam = position ? `${position}:tab` : "tab";
  const history = useHistory();
  const [t] = useTranslation("tabs");
  const activeTab = getActiveQueryTab(tabs);
  const Form = formsMap[activeTab.tabCode];

  const handleChange = useCallback((id) => {
    setActiveQueryTab(id, queryParam, history);
  }, []);

  const isTabDisabled = (currentTab: string) =>
    currentTab !== mainTab && mode === "add";

  return (
    <div className={className}>
      <TabsUI
        className={style.tabs}
        defaultActiveKey={activeTab.tabCode}
        activeKey={activeTab.tabCode}
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
        <Form tab={activeTab} mode={mode} {...props} />
      </div>
    </div>
  );
};

export default Tabs;
