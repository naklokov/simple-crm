import React from "react";
import axios from "axios";
import { Form as FormUI, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import style from "./forgot-password.module.scss";
import { useHistory } from "react-router-dom";
import { Store } from "antd/lib/form/interface";
import { urls } from "../../constants";
import { logger } from "../../utils";

import { getRules, getInitialValues } from "./utils";
import { UnauthorizedLayout } from "../../layouts";

const { Item } = FormUI;

export const ForgotPassword = () => {
  const [t] = useTranslation("forgotPassword");
  const history = useHistory();
  const rules = getRules(t);
  const initialValues = getInitialValues(history);

  const onFinish = async ({ username }: Store) => {
    try {
      const messageSuccess = t("message.success", { username });
      await axios.post(urls.forgotPassword.submit, { username });

      logger.debug({
        message: messageSuccess,
      });

      message.success(messageSuccess);
      history.push("/");
    } catch ({ response: { data } }) {
      logger.error({
        value: data.errorCode,
        message: data.errorDescription,
        username,
      });

      message.error(data.errorDescription || t("message.error"));
    }
  };

  return (
    <UnauthorizedLayout title={t("title")} description={t("description")}>
      <FormUI
        name="forgotPasswordForm"
        className={style.forgotPasswordForm}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Item name="username" rules={rules.username} validateTrigger="onBlur">
          <Input
            className={style.username}
            prefix={<UserOutlined />}
            placeholder={t("placeholder.username")}
          />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className={style.submitButton}
          >
            {t("submit.button")}
          </Button>
        </Item>
      </FormUI>
    </UnauthorizedLayout>
  );
};

export default ForgotPassword;
