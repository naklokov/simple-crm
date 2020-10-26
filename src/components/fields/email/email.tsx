import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Input, Col, Tooltip } from "antd";
import { DEFAULT_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import { MailOutlined } from "@ant-design/icons";
import { checkEmail } from "../../../utils";
import { useTranslation } from "react-i18next";

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
  span = DEFAULT_SPAN,
}: FieldProps) => {
  const [t] = useTranslation("fields");
  const [value, setValue] = useState("");

  const handleValueProps = useCallback((input: string) => {
    setValue(input);
    return { value: input };
  }, []);

  const handleSend = useCallback(() => {
    window.location.assign(getEmailLink(value));
  }, [value]);

  const colSpan = { ...DEFAULT_SPAN, ...span };
  return (
    <Col {...colSpan} key={fieldCode}>
      <Form.Item
        style={{ width: "100%" }}
        name={fieldCode}
        label={fieldName}
        extra={fieldDescription}
        validateTrigger="onSubmit"
        rules={rules}
        getValueProps={handleValueProps}
      >
        {readonly ? (
          <Readonly type="href" onClickLink={handleSend} />
        ) : (
          <Input
            suffix={
              checkEmail(value) ? (
                <Tooltip title={t("email.tooltip")}>
                  <MailOutlined onClick={handleSend} className={style.icon} />
                </Tooltip>
              ) : (
                <div />
              )
            }
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
