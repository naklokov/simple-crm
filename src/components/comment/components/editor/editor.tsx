import React, { useCallback, useRef, useEffect, useState } from "react";
import { Input, Form, Button } from "antd";
import { useTranslation } from "react-i18next";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { handlePressEnter } from "../../../../utils";
import { formConfig } from "../../../../constants";

const { TextArea } = Input;

interface EditableTextProps {
  initialValue: string;
  onFinish: (text: string) => void;
}

export const Editor = ({ initialValue, onFinish }: EditableTextProps) => {
  const [t] = useTranslation("comment");
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();
  const inputRef = useRef<TextAreaRef>(null);

  useEffect(() => {
    inputRef?.current?.focus?.();
  }, []);

  const handleFinish = useCallback(async () => {
    const { comment } = await form.validateFields();
    onFinish(comment?.trim());
    setDisabled(true);
  }, [form, onFinish]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      handlePressEnter(e, handleFinish);
    },
    [handleFinish]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setDisabled(!value?.trim());
    },
    []
  );

  return (
    <Form form={form} layout="inline" initialValues={{ comment: initialValue }}>
      <Form.Item
        style={{ margin: 0, width: "50%" }}
        name="comment"
        rules={[
          {
            max: formConfig.clientCard.MAX_COMMENT_LENGTH,
            message: t("rules.maxLength", {
              count: formConfig.clientCard.MAX_COMMENT_LENGTH,
            }),
          },
        ]}
      >
        <TextArea
          ref={inputRef}
          onKeyDown={handleKeyDown}
          autoSize={{ minRows: 1, maxRows: 6 }}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item style={{ width: "10px", marginLeft: "8px" }}>
        <Button type="primary" onClick={handleFinish} disabled={disabled}>
          {t("comment.save")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Editor;
