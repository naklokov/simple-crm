import React, { useState, useEffect, useCallback, SyntheticEvent } from "react";
import { Form, Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

import style from "./form-footer.module.scss";
import { ComponentPermissionsChecker } from "../../wrappers";
import { FormInstance } from "antd/lib/form";

interface FormFooterProps {
  form?: FormInstance;
  disabled: boolean;
  loading: boolean;
  permissions?: string[];
  withCancel?: boolean;
  onCancel?: () => void;
}

export const FormFooter = ({
  form,
  disabled = true,
  loading = false,
  permissions = [],
  withCancel = true,
  onCancel,
}: FormFooterProps) => {
  const [visible, setVisible] = useState(false);
  const [t] = useTranslation("formFooter");

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const handleClick = useCallback(() => {
    if (form) {
      form.submit();
    }
  }, [form]);

  const handleVisibleChange = useCallback(() => {
    if (disabled && onCancel) {
      onCancel();
    } else {
      setVisible(!visible);
    }
  }, [visible, disabled]);

  return (
    <Form.Item className={style.container}>
      {withCancel && (
        <Popconfirm
          placement="topRight"
          title={t("confirm")}
          onConfirm={onCancel}
          onCancel={handleCancel}
          onVisibleChange={handleVisibleChange}
          visible={visible}
          okText={t("confirm.yes")}
          cancelText={t("confirm.no")}
        >
          <Button className={style.cancel}>{t("cancel")}</Button>
        </Popconfirm>
      )}
      <ComponentPermissionsChecker availablePermissions={permissions}>
        <Button
          type="primary"
          htmlType="submit"
          className={style.submit}
          loading={loading}
          disabled={disabled}
          onClick={handleClick}
        >
          {t("submit")}
        </Button>
      </ComponentPermissionsChecker>
    </Form.Item>
  );
};

export default FormFooter;
