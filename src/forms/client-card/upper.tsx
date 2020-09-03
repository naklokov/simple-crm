import React, { useState, useCallback } from "react";
import { Tabs } from "antd";
import { TABS_MAP } from "./constants";
import { formConfig } from "../../constants";

import style from "./client-card.module.scss";

const { TabPane } = Tabs;

const {
  clientCard: {
    UPPER: { tabs },
  },
} = formConfig;

export const Upper = () => {
  const [active, setActive] = useState(tabs[0].tabCode);

  const handleChange = useCallback((id) => {
    setActive(id);
  }, []);

  const Form = TABS_MAP[active];
  const tab = tabs.find(({ tabCode }) => tabCode === active);

  return (
    <React.Fragment>
      <Tabs
        className={style.upperTabs}
        defaultActiveKey={tabs[0].tabCode}
        onChange={handleChange}
      >
        {tabs.map(({ tabCode, tabName }) => (
          <TabPane className={style.upperTabPane} tab={tabName} key={tabCode} />
        ))}
      </Tabs>

      <div className={style.form}>
        <Form tab={tab} />
      </div>
    </React.Fragment>
  );
};
