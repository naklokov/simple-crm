import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Input, Col, Tooltip } from "antd";
import { DEFAULT_SPAN, FieldProps } from "../../../constants";
import { Readonly } from "../readonly";
import { LinkOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import style from "./href.module.scss";
import { openUrlTargetBlank } from "../../../utils";

export const Href = ({
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

  const getPrefixedUrl = (value: string) =>
    /^(http|https|www):/.test(value) ? value : "http://" + value;

  const handleValueProps = useCallback((input: string) => {
    setValue(input);
    return { value: input };
  }, []);

  const handleClick = useCallback(() => {
    const url = getPrefixedUrl(value);
    openUrlTargetBlank(url);
  }, [value]);

  return (
    <Col {...span} key={fieldCode}>
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
          <Readonly type="href" onClickLink={handleClick} />
        ) : (
          <Input
            suffix={
              !!value ? (
                <Tooltip title={t("href.tooltip")}>
                  <LinkOutlined onClick={handleClick} className={style.icon} />
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

export default Href;
