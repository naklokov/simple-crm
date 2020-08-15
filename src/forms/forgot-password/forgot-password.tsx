import React, { useState } from "react";
import axios from "axios";
import { Form as FormUI, Input, Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import style from "./forgot-password.module.scss";
import { useHistory } from "react-router-dom";
import { Store } from "antd/lib/form/interface";
import { urls } from "../../constants";
import { logger, defaultErrorHandler } from "../../utils";
import { FORM_NAME, FIELDS } from "./constants";

import { getRules, getInitialValues } from "./utils";

const { Item } = FormUI;

export const ForgotPassword = () => {
  const [t] = useTranslation(FORM_NAME);
  const history = useHistory();
  const rules = getRules(t);
  const initialValues = getInitialValues(history);
  const [submitLoading, setSubmitLoading] = useState(false);

  const onFinish = async ({ username }: Store) => {
    try {
      setSubmitLoading(true);
      const messageSuccess = t("message.success", { username });
      await axios.post(urls.forgotPassword.submit, { username });

      logger.debug({
        message: messageSuccess,
      });

      message.success(messageSuccess);
      history.push("/");
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <FormUI
      name={FORM_NAME}
      className={style.forgotPasswordForm}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Item
        name={FIELDS.USERNAME}
        rules={rules.username}
        validateTrigger="onBlur"
      >
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
          loading={submitLoading}
        >
          {t("submit.button")}
        </Button>
      </Item>
    </FormUI>
  );
};

export default ForgotPassword;
