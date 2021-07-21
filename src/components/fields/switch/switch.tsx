import { Col, Form, Switch as SwitchUI } from "antd";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import { FormContext } from "../../../utils";

export const Switch = ({
  fieldCode,
  rules,
  fieldName,
  fieldDescription,
  disabled = false,
  _links,
  readonly = false,
  span = DEFAULT_FIELD_SPAN,
}: FieldProps) => {
  const { form } = useContext(FormContext);
  const value = form.getFieldValue(fieldCode);
  const [t] = useTranslation("switch");

  const formatText = (data: any) => t(`title.${data}`);

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        style={{ width: "100%" }}
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        validateTrigger="onBlur"
        rules={rules}
      >
        {readonly ? (
          <Readonly value={value} format={formatText} />
        ) : (
          <SwitchUI
            checked={value}
            disabled={disabled}
            checkedChildren={t(`title.true`)}
            unCheckedChildren={t(`title.false`)}
          />
        )}
      </Form.Item>
    </Col>
  );
};
