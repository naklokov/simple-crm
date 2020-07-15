import React, { SyntheticEvent } from "react";
import axios from "axios";
import { Form as FormUI, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import style from "./login.module.scss";
import { useHistory } from "react-router-dom";
import { Store } from "antd/lib/form/interface";
import { urls } from "../../constants";
import { logger } from "../../utils";

import {
  storeRememberMeParams,
  getPrevUrl,
  getRules,
  getInitialValues,
} from "./utils";
import { UnauthorizedLayout } from "../../layouts";

const { Item } = FormUI;

// TODO Добавить обработку rememberMe параметров из localStorage
export const Login = () => {
  const [form] = FormUI.useForm();
  const [t] = useTranslation("login");
  const history = useHistory();
  const rules = getRules(t);
  const initialValues = getInitialValues();

  const onFinish = async (values: Store) => {
    try {
      await axios.post(urls.login.submit, { ...values });
      storeRememberMeParams();

      logger.debug({
        message: t("authentication.successfull"),
        username: values.username,
      });

      const prevUrl = getPrevUrl(history);
      history.push(prevUrl);
    } catch ({ response: { data } }) {
      logger.error({
        value: data.errorCode,
        message: data.errorDescription,
        username: values.username,
      });

      message.error(data.errorDescription || t("message.error"));
    }
  };

  const handleClickForgotPassword = (event: SyntheticEvent) => {
    const username = form.getFieldValue("username");
    history.push(urls.forgotPassword.path, { username });
    event.preventDefault();
  };

  return (
    <UnauthorizedLayout title={t("title")}>
      <FormUI
        form={form}
        name="loginForm"
        className={style.loginForm}
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
        <Item name="password" rules={rules.password}>
          <Input.Password
            className={style.password}
            prefix={<LockOutlined />}
            type="password"
            placeholder={t("placeholder.password")}
          />
        </Item>
        <Item>
          <Item
            name="rememberMe"
            valuePropName="checked"
            className={style.rememberMeCheckbox}
          >
            <Checkbox>{t("password.remember")}</Checkbox>
          </Item>
          <a
            className={style.forgotPassword}
            onClick={handleClickForgotPassword}
            href={urls.forgotPassword.path}
          >
            {t("password.forgot")}
          </a>
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

export default Login;
