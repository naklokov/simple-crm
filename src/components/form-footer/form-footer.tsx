import React, { useState, useEffect, useCallback, SyntheticEvent } from "react";
import { Form, Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

import style from "./form-footer.module.scss";
import { ComponentPermissionsChecker } from "../../wrappers";

interface FormFooterProps {
  disabled: boolean;
  loading: boolean;
  permissions?: string[];
  onCancel?: () => void;
}

export const FormFooter = ({
  disabled = true,
  loading = false,
  permissions = [],
  onCancel,
}: FormFooterProps) => {
  const [visible, setVisible] = useState(false);
  const [t] = useTranslation("formFooter");

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const handleVisibleChange = useCallback(() => {
    if (disabled && onCancel) {
      onCancel();
    } else {
      setVisible(!visible);
    }
  }, [visible, disabled]);

  return (
    <Form.Item className={style.container}>
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
      <ComponentPermissionsChecker availablePermissions={permissions}>
        <Button
          type="primary"
          htmlType="submit"
          className={style.submit}
          loading={loading}
          disabled={disabled}
        >
          {t("submit")}
        </Button>
      </ComponentPermissionsChecker>
    </Form.Item>
  );
};

export default FormFooter;
