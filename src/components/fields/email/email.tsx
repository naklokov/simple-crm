import React, { useCallback, useContext, useState } from "react";
import { Form, Input, Col, Tooltip } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { DEFAULT_FIELD_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import {
  checkEmail,
  FormContext,
  useFormValues,
  useValidationService,
} from "../../../utils";

import style from "./email.module.scss";

const getEmailLink = (value: string) => `mailto:${value}`;

export const Email = ({
  fieldCode,
  rules,
  fieldName,
  fieldDescription,
  placeholder,
  disabled = false,
  readonly = false,
  span = DEFAULT_FIELD_SPAN,
  _links,
}: FieldProps) => {
  const { name } = useContext(FormContext);
  const [formValues] = useFormValues(name ?? "");
  const { wrappedRules } = useValidationService(
    rules,
    _links?.validation?.href ?? "",
    formValues
  );
  const [t] = useTranslation("fields");
  const [value, setValue] = useState("");

  const handleValueProps = useCallback((input: string) => {
    setValue(input);
    return { value: input };
  }, []);

  const handleSend = useCallback(() => {
    window.location.assign(getEmailLink(value));
  }, [value]);

  const actionIcon = checkEmail(value) ? (
    <Tooltip title={t("email.tooltip")}>
      <MailOutlined onClick={handleSend} className={style.icon} />
    </Tooltip>
  ) : (
    <div />
  );

  return (
    <Col {...span} key={fieldCode}>
      <Form.Item
        style={{ width: "100%" }}
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        validateTrigger="onBlur"
        rules={wrappedRules}
        getValueProps={handleValueProps}
      >
        {readonly ? (
          <Readonly type="href" onClickLink={handleSend} />
        ) : (
          <Input
            suffix={actionIcon}
            autoComplete="off"
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      </Form.Item>
    </Col>
  );
};

export default Email;
