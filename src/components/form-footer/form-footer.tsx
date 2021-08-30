import React, { useState, useCallback, CSSProperties } from "react";
import { Form, Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

import { FormInstance } from "antd/lib/form";
import styleCss from "./form-footer.module.scss";
import { ComponentPermissionsChecker } from "../../wrappers";

interface FormFooterProps {
  form?: FormInstance;
  disabled?: boolean;
  loading?: boolean;
  permissions?: string[];
  withCancel?: boolean;
  onCancel?: () => void;
  style?: CSSProperties;
}

export const FormFooter: React.FC<FormFooterProps> = ({
  form,
  disabled = false,
  loading = false,
  permissions = [],
  withCancel = true,
  style = {},
  onCancel,
}) => {
  const [visible, setVisible] = useState(false);
  const [t] = useTranslation("formFooter");

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const handleClick = useCallback(
    (event) => {
      if (form) {
        form.submit();
        event.preventDefault();
      }
    },
    [form]
  );

  const handleVisibleChange = useCallback(() => {
    if (disabled && onCancel) {
      onCancel();
    } else {
      setVisible(!visible);
    }
  }, [visible, disabled, onCancel]);

  return (
    <Form.Item style={style} className={styleCss.container}>
      {withCancel && (
        <Popconfirm
          placement="topRight"
          title={t("confirm")}
          onConfirm={onCancel}
          onCancel={handleCancel}
          onVisibleChange={handleVisibleChange}
          visible={visible}
        >
          <Button className={styleCss.cancel}>{t("cancel")}</Button>
        </Popconfirm>
      )}
      <ComponentPermissionsChecker availablePermissions={permissions}>
        <Button
          type="primary"
          htmlType="submit"
          className={styleCss.submit}
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
