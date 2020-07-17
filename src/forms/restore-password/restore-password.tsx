import React, { useEffect, SyntheticEvent } from "react";
import axios from "axios";
import { Form as FormUI, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import style from "./restore-password.module.scss";
import { useHistory } from "react-router-dom";
import { Store } from "antd/lib/form/interface";
import { urls } from "../../constants";
import { FIELDS, FORM_NAME } from "./constants";
import { logger } from "../../utils";

import { getRules, checkEqualPasswords, checkToken, getToken } from "./utils";
import { UnauthorizedLayout } from "../../layouts";

const { Item } = FormUI;
const token = getToken();

export const RestorePassword = () => {
  const [form] = FormUI.useForm();
  const [t] = useTranslation(FORM_NAME);
  const history = useHistory();
  const rules = getRules(t);

  useEffect(() => {
    checkToken(token, t);
  }, []);

  const handleClick = (event: SyntheticEvent) => {
    if (!checkEqualPasswords(form)) {
      message.error("Пароли не совпадают", 5);
      event.preventDefault();
    }
  };

  const onFinish = async ({ [FIELDS.PASSWORD]: password }: Store) => {
    try {
      await axios.post(urls.restorePassword.submit, { password, token });

      logger.debug({
        message: t("message.success"),
      });
      message.success(t("message.success"));
      history.push("/");
    } catch ({ response: { data } }) {
      logger.error({
        value: data.errorCode,
        message: data.errorDescription,
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
