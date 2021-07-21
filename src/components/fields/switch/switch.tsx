import { Col, Form, Switch as SwitchUI } from "antd";
import React, { useContext } from "react";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import { FormContext } from "../../../utils";

export const Switch = ({
                         fieldCode,
                         rules,
                         fieldName,
                         titleField = "value",
                         codeField = "valueCode",
                         fieldDescription,
                         disabled = false,
                         _links,
                         readonly = false,
                         span = DEFAULT_FIELD_SPAN,
                         checkedText = { checkedChildren: "Да", unCheckedChildren: "Нет" },
                       }: FieldProps) => {

  const { form } = useContext(FormContext);
  const value = form.getFieldValue(fieldCode);

  console.log('value', value)
  console.log('type value', typeof value)

  const valueFormat = (data: string) =>
    data ? checkedText.checkedChildren : checkedText.unCheckedChildren;

  return <Col {...span} key={fieldCode}><Form.Item
    style={{ width: "100%" }}
    name={fieldCode}
    label={fieldName}
    extra={fieldDescription}
    validateTrigger="onBlur"
    rules={rules}
  >
    {readonly ? <Readonly value={value} format={valueFormat} /> :
      <SwitchUI checked={value} disabled={disabled} {...checkedText} />}
  </Form.Item>
  </Col>;

};