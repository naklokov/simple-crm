import { Typography } from "antd";
import React from "react";

interface PersonProps {
  title: string;
  name: string;
}

export const Person: React.FC<PersonProps> = ({ title, name }) => (
  <div>
    <Typography.Text
      type="secondary"
      style={{ display: "block", fontSize: "10px" }}
    >
      {title}
    </Typography.Text>
    <Typography.Text style={{ display: "block", fontSize: "16px" }}>
      {name}
    </Typography.Text>
  </div>
);
