import React, { useCallback } from "react";
import cn from "classnames";
import { Tabs as TabsUI, Tooltip } from "antd";
import { ModeType, TabPositionType, TabProps } from "../../constants";

import style from "./tabs.module.scss";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import {
  getActiveQueryTab,
  getPositionQueryParam,
  setActiveQueryTab,
} from "./utils";

const { TabPane } = TabsUI;

interface TabsThemeProps {
  tabs?: string;
  form?: string;
}

interface TabsProps {
  mainTab?: string;
  mode?: ModeType;
  tabs: TabProps[];
  position?: TabPositionType;
  tabsMap: { [key: string]: (props: any) => JSX.Element };
  theme?: TabsThemeProps;
}

export const Tabs = ({
  mode = "view",
  mainTab = "",
  tabs,
  tabsMap,
  theme = {},
  position,
  ...props
}: TabsProps) => {
  const queryParam = getPositionQueryParam(position);
  const history = useHistory();
  const [t] = useTranslation("tabs");
  const activeTab = getActiveQueryTab(tabs);
  const Form = tabsMap[activeTab.tabCode];

  const handleChange = useCallback((id) => {
    setActiveQueryTab(id, queryParam, history);
  }, []);

  const isTabDisabled = (currentTab: string) =>
    currentTab !== mainTab && mode === "add";

  return (
    <div>
      <TabsUI
        className={cn(style.tabs, theme.tabs)}
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
      <div className={cn(style.form, theme.form)}>
        <Form tab={activeTab} mode={mode} {...props} />
      </div>
    </div>
  );
};

export default Tabs;
