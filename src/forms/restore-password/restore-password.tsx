import React, { useEffect, useCallback, SyntheticEvent, useState } from "react";
import axios from "axios";
import { Form as FormUI, Input, Button, Checkbox, message, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import style from "./restore-password.module.scss";
import { useHistory } from "react-router-dom";
import { Store } from "antd/lib/form/interface";
import { urls } from "../../constants";
import { FIELDS, FORM_NAME } from "./constants";
import { logger } from "../../utils";

import { getRules, checkEqualPasswords, checkToken } from "./utils";
import { UnauthorizedLayout } from "../../layouts";

const { Item } = FormUI;

export const RestorePassword = () => {
  const [form] = FormUI.useForm();
  const [t] = useTranslation(FORM_NAME);
  const history = useHistory();
  const rules = getRules(t);

  useEffect(() => {
    checkToken(t);
  }, []);

  const handleClick = (event: SyntheticEvent) => {
    if (!checkEqualPasswords(form)) {
      message.error("Пароли не совпадают", 5);
      event.preventDefault();
    }
  };

  const onFinish = async ({ username }: Store) => {
    try {
      const messageSuccess = t("message.success", { username });
      await axios.post(urls.restorePassword.submit, { username });

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
        form={form}
        name={FORM_NAME}
        className={style.restorePassword}
        onFinish={onFinish}
      >
        <Item name={FIELDS.PASSWORD} rules={rules.password}>
          <Input.Password
            className={style.password}
            prefix={<LockOutlined />}
            type="password"
            placeholder={t("placeholder.password")}
          />
        </Item>
        <Item name={FIELDS.PASSWORD_CONFIRM} rules={rules.password}>
          <Input.Password
            className={style.passwordConfirm}
            prefix={<LockOutlined />}
            type="password"
            placeholder={t("placeholder.password.confirm")}
          />
        </Item>
        <Item>
          <Button
            onClick={handleClick}
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

export default RestorePassword;
