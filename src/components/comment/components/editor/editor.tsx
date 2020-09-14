import React, { useState, useCallback, useRef, useEffect } from "react";
import { Input, Form } from "antd";
import TextAreaLib from "antd/lib/input/TextArea";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

interface EditableTextProps {
  initialValue: string;
  onFinish: (text: string) => void;
}

export const Editor = ({ initialValue, onFinish }: EditableTextProps) => {
  const [t] = useTranslation("comment");
  const inputRef = useRef<TextAreaLib>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    inputRef?.current?.focus?.();
  }, []);

  const handleFinish = useCallback(async () => {
    const { comment } = await form.validateFields();
    onFinish(comment);
  }, [form]);

  return (
    <Form
      form={form}
      component={false}
      initialValues={{ comment: initialValue }}
    >
      <Form.Item
        style={{ margin: 0 }}
        name="comment"
        rules={[
          {
            required: true,
            message: t("rules.required"),
          },
        ]}
      >
        <TextArea
          ref={inputRef}
          onPressEnter={handleFinish}
          onBlur={handleFinish}
          autoSize={{ minRows: 1, maxRows: 6 }}
        />
      </Form.Item>
    </Form>
  );
};

export default Editor;
