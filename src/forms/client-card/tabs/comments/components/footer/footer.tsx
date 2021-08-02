import React, { useState, useCallback } from "react";
import { Input, Button, Form } from "antd";
import { useTranslation } from "react-i18next";
import { handlePressEnter } from "../../../../../../utils";
import { formConfig } from "../../../../../../constants";

import style from "./footer.module.scss";

interface FooterProps {
  onSend: (text: string) => void;
}

export const Footer = ({ onSend }: FooterProps) => {
  const [t] = useTranslation("clientCardComments");
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setDisabled(!value.trim());
    },
    []
  );

  const handleFinish = useCallback(async () => {
    const { message } = await form.validateFields();
    if (message?.trim()) {
      form.resetFields();
      setDisabled(true);
      onSend(message.trim());
    }
  }, [form, onSend]);

  const handlePressKey = useCallback(
    (event: React.KeyboardEvent) => {
      handlePressEnter(event, handleFinish);
    },
    [handleFinish]
  );

  return (
    <Form form={form} style={{ display: "flex" }} layout="horizontal">
      <Form.Item
        style={{ flex: 1, marginBottom: 0 }}
        name="message"
        rules={[
          {
            max: formConfig.clientCard.MAX_COMMENT_LENGTH,
            message: t("rules.maxLength", {
              count: formConfig.clientCard.MAX_COMMENT_LENGTH,
            }),
          },
        ]}
      >
        <Input.TextArea
          style={{ width: "100%" }}
          className={style.textArea}
          placeholder={t("textarea.placeholder")}
          autoSize={{ minRows: 1, maxRows: 6 }}
          onKeyPress={handlePressKey}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          htmlType="submit"
          type="primary"
          className={style.button}
          disabled={disabled}
          onClick={handleFinish}
        >
          {t("button")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Footer;
