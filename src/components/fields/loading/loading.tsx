import React, { CSSProperties } from "react";
import { Col, Form } from "antd";
import { SpanProps } from "../../../constants";
import { Skeleton } from "../../skeleton";

interface LoadingProps {
  name: string;
  label?: string;
  extra?: string;
  span: SpanProps;
  style: CSSProperties;
}

export const Loading: React.FC<LoadingProps> = ({
  name,
  label,
  extra,
  span,
  style,
}) => (
  <Col {...span} key={name}>
    <Form.Item name={name} label={label} extra={extra} style={style}>
      <Skeleton.Input />
    </Form.Item>
  </Col>
);

export default Loading;
