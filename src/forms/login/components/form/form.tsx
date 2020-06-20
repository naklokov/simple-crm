import React from "react";
import axios from 'axios'
import { Form as FormUI, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import style from "./form.module.scss";
import { Link } from "react-router-dom";

const { Item } = FormUI;

const onFinish = () => {
  console.log("Success");
};

const onFinishFailed = () => {
  console.log("Failed");
};

export const Form = () => {
  const [t] = useTranslation("login");

  const initialValues = {
    remember: true,
  };

  const rules = {
    username: [
      {
        required: true,
        message: t("rules.username.required"),
      },
    ],
    password: [
      {
        required: true,
        message: t("rules.password.required"),
      },
    ],
  };

  return (
    <FormUI
      name="loginForm"
      className={style.loginForm}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Item
        name="username"
        rules={rules.username}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={t("placeholder.username")}
        />
      </Item>
      <Item name="password" rules={rules.password}>
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={t("placeholder.password")}
        />
      </Item>
      <Item>
        <Item
          name="remember"
          valuePropName="checked"
          className={style.rememberCheckbox}
        >
          <Checkbox>{t("password.remember")}</Checkbox>
        </Item>
        <Link className={style.forgotPassword} to="/forgotPassword">
          {t("password.forgot")}
        </Link>
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" className={style.submitButton}>
          {t("submit.button")}
        </Button>
      </Item>
    </FormUI>
  );
};
