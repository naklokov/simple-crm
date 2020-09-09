import React, { useState, useCallback } from "react";
import { Input, Button } from "antd";
import { useTranslation } from "react-i18next";

import style from "./footer.module.scss";

const { TextArea } = Input;

interface FooterProps {
  onSend: (text: string) => void;
}

export const Footer = ({ onSend }: FooterProps) => {
  const [t] = useTranslation("comments");
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setComment(value);
      setDisabled(!value);
    },
    [comment]
  );

  const handleClick = useCallback(
    (event: any) => {
      if (comment) {
        setComment("");
        setDisabled(true);
        onSend(comment);
        event.preventDefault();
      }
    },
    [comment, onSend]
  );

  return (
    <div className={style.container}>
      <TextArea
        className={style.textArea}
        placeholder={t("textarea.placeholder")}
        autoSize={{ minRows: 1, maxRows: 6 }}
        value={comment}
        onPressEnter={handleClick}
        onChange={handleChange}
      />
      <Button
        type="primary"
        className={style.button}
        disabled={disabled}
        onClick={handleClick}
      >
        {t("button")}
      </Button>
    </div>
  );
};

export default Footer;
