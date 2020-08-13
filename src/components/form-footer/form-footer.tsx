import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

import style from "./form-footer.module.scss";
import { useHistory } from "react-router";

interface FormFooterProps {
  disabled: boolean;
  loading: boolean;
}

export const FormFooter = ({
  disabled = true,
  loading = false,
}: FormFooterProps) => {
  const [visible, setVisible] = useState(false);
  const [t] = useTranslation("formFooter");
  const history = useHistory();

  const handleConfirm = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const handleVisibleChange = useCallback(() => {
    if (disabled) {
      handleConfirm();
    } else {
      setVisible(!visible);
    }
  }, [visible, disabled]);

  return (
    <Form.Item className={style.container}>
      <Popconfirm
        placement="topRight"
        title={t("confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onVisibleChange={handleVisibleChange}
        visible={visible}
        okText={t("confirm.yes")}
        cancelText={t("confirm.no")}
      >
        <Button className={style.cancel}>{t("cancel")}</Button>
      </Popconfirm>
      <Button
        type="primary"
        htmlType="submit"
        className={style.submit}
        loading={loading}
        disabled={disabled}
      >
        {t("submit")}
      </Button>
    </Form.Item>
  );
};

export default FormFooter;
