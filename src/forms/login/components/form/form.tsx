import React from "react";
import axios from 'axios'
import Cookies from 'js-cookie'
import { Form as FormUI, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { RouteComponentProps } from 'react-router-dom'

import { useTranslation } from "react-i18next";

import style from "./form.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "antd/lib/form/util";
import { RuleObject } from "antd/lib/form";
import { Store } from "antd/lib/form/interface";

import { URLS } from '../../../../constants';

const { Item } = FormUI;

const saveToken = () => {
  const token = Cookies.get('rememberMe')
  if (token) {
    localStorage.setItem('token', token)
  }
}

export const Form = ({ location, history, ...props }: RouteComponentProps) => {
  const [t] = useTranslation("login");
  const [form] = useForm()
  console.log(props)

  const onFinish = async (values: Store) => {
    try {
      await axios.post(URLS.login.submit, {...values})
      // сохраняем токет "Запомнить меня"
      const { rememberMe } = values
      if (rememberMe) {
        saveToken()
      }

      history.push('/clients')
    } catch (err) {
      //TODO Прикрутить логирование
      message.error(t('message.error'))
    }
  };

  const initialValues = {
    rememberMe: true,
  };

  const rules: {[key: string]: RuleObject[]} = {
    username: [
      {
        type: 'email',
        message: t('rules.username.format')
      },
      {
        required: true,
        message: t('rules.username.required')
      }
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
      form={form}
      name="loginForm"
      className={style.loginForm}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Item
        name="username"
        rules={rules.username}
        validateTrigger="onBlur"
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={t("placeholder.username")}
        />
      </Item>
      <Item name="password" rules={rules.password}>
        <Input.Password
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
