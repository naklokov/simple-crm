import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

interface PaneProps {
  code: string;
  name: string;
}

export const Pane = ({ name }: PaneProps) => <TabPane tab={name} />;
