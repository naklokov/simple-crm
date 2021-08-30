import React from "react";
import { Col, Form, Select } from "antd";
import {
  DEFAULT_FIELD_SPAN,
  COLOR_THEME_FIELD,
  COLOR_THEME_DEFAULT,
} from "../../../../constants";
import { LABEL, PLACEHOLDER, THEME_OPTIONS } from "./constants";

export const ColorTheme = () => (
  <Col {...DEFAULT_FIELD_SPAN} key={COLOR_THEME_FIELD}>
    <Form.Item name={COLOR_THEME_FIELD} label={LABEL}>
      <Select placeholder={PLACEHOLDER} style={{ width: "100%" }}>
        {THEME_OPTIONS.map(({ value, label }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  </Col>
);

export default ColorTheme;
