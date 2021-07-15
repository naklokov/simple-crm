import React, { useCallback, useRef, useEffect, useState } from "react";
import { Input, Form, Button } from "antd";
import { useTranslation } from "react-i18next";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { handlePressEnter } from "../../../../utils";
import { MAX_COMMENT_LENGTH } from "../../../../constants/form-config/client-card";


const { TextArea } = Input;

interface EditableTextProps {
  initialValue: string;
  onFinish: (text: string) => void;
}

export const Editor = ({ initialValue, onFinish }: EditableTextProps) => {
  const [t] = useTranslation("comment");
  const inputRef = useRef<TextAreaRef>(null);
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    inputRef?.current?.focus?.();
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setDisabled(!value.trim());
    }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      handlePressEnter(e, handleFinish);
    },
    [form]
  );

  const handleFinish = useCallback(async () => {
    const { comment } = await form.validateFields();
    onFinish(comment.trim());
  }, [form]);

  return (
    <Form form={form} layout="inline" initialValues={{ comment: initialValue }}>
      <Form.Item
        style={{ margin: 0, width: "50%" }}
        name="comment"
        rules={[
          {
            max: MAX_COMMENT_LENGTH,
            message: t("rules.maxLength", { count: MAX_COMMENT_LENGTH })
          }
        ]}
      >
        <TextArea
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onBlur={handleFinish}
          autoSize={{ minRows: 1, maxRows: 6 }}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item style={{ width: "10px", marginLeft: "8px" }}>
        <Button
          type="primary"
          onClick={handleFinish}
          disabled={disabled}
        >
          {t("comment.save")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Editor;
