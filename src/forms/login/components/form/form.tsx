import React from "react";
import axios from "axios";
import { Form as FormUI, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import style from "./form.module.scss";
import { useHistory } from "react-router-dom";
import { Store } from "antd/lib/form/interface";

import { urls } from "../../../../constants";
import {
  storeRememberMeParams,
  getPrevUrl,
  getRules,
  getInitialValues,
} from "./utils";

const { Item } = FormUI;

// TODO Добавить обработку rememberMe параметров из localStorage
export const Form = () => {
  const [t] = useTranslation("login");
  const history = useHistory();
  const rules = getRules(t);
  const initialValues = getInitialValues();

  const onFinish = async (values: Store) => {
    try {
      await axios.post(urls.login.submit, { ...values });
      storeRememberMeParams();
      const prevUrl = getPrevUrl(history);
      history.push(prevUrl);
    } catch (err) {
      // TODO Добавить тексты ошибок от бека
      // TODO возвращать ошибку по полям с бека (типа валидационных ошибок)
      console.error(err.message, values.username);
      message.error(t("message.error"));
    }
  };

  return (
    <FormUI
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
        <a className={style.forgotPassword} href="/forgotPassword">
          {t("password.forgot")}
        </a>
      </Item>
      <Item>
        <Button type="primary" htmlType="submit" className={style.submitButton}>
          {t("submit.button")}
        </Button>
      </Item>
    </FormUI>
  );
};

export default Form;
