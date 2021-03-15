import React, { useCallback, useRef, useEffect } from "react";
import { Input, Form, Button } from "antd";
import { useTranslation } from "react-i18next";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { handlePressEnter } from "../../../../utils";

const { TextArea } = Input;

interface EditableTextProps {
  initialValue: string;
  onFinish: (text: string) => void;
}

export const Editor = ({ initialValue, onFinish }: EditableTextProps) => {
  const [t] = useTranslation("comment");
  const inputRef = useRef<TextAreaRef>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    inputRef?.current?.focus?.();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      handlePressEnter(e, handleFinish);
    },
    [form]
  );

  const handleFinish = useCallback(async () => {
    const { comment } = await form.validateFields();
    onFinish(comment);
  }, [form]);

  return (
    <Form form={form} layout="inline" initialValues={{ comment: initialValue }}>
      <Form.Item
        style={{ margin: 0, width: "50%" }}
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
          onKeyDown={handleKeyDown}
          onBlur={handleFinish}
          autoSize={{ minRows: 1, maxRows: 6 }}
        />
      </Form.Item>
      <Form.Item style={{ width: "10px", marginLeft: "8px" }}>
        <Button type="primary" onClick={handleFinish}>
          {t("comment.save")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Editor;
