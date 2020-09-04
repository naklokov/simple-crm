import React, { useState, useCallback } from "react";
import { Tabs as TabsUI } from "antd";
import { ModeType, TabProps } from "../../constants";

import style from "./tabs.module.scss";

const { TabPane } = TabsUI;

interface TabsProps {
  className?: any;
  mode: ModeType;
  tabs: TabProps[];
  formsMap: { [key: string]: (props: any) => JSX.Element };
}

export const Tabs = ({
  mode,
  tabs,
  formsMap,
  className,
  ...props
}: TabsProps) => {
  const defaultActiveKey = tabs?.[0]?.tabCode ?? "";
  const [activeTab, setActiveTab] = useState(defaultActiveKey);
  const tab = tabs.find(({ tabCode }) => tabCode === activeTab);

  const Form = formsMap[activeTab];

  const handleChange = useCallback((id) => {
    setActiveTab(id);
  }, []);

  const isTabDisabled = (idx: number, mode: ModeType) =>
    mode === "add" && idx !== 0;

  return (
    <div className={className}>
      <TabsUI
        className={style.tabs}
        defaultActiveKey={defaultActiveKey}
        onChange={handleChange}
      >
        {tabs.map(({ tabCode, tabName }, idx) => (
          <TabPane
            className={style.upperTabPane}
            tab={tabName}
            key={tabCode}
            disabled={isTabDisabled(idx, mode)}
          />
        ))}
      </TabsUI>
      <Form tab={tab} {...props} />
    </div>
  );
};

export default Tabs;
