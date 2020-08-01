import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Form as FormUI, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import style from "./login.module.scss";
import { useHistory } from "react-router-dom";
import { Store } from "antd/lib/form/interface";
import { urls } from "../../constants";
import { logger } from "../../utils";
import { FORM_NAME, FIELDS } from "./constants";

import {
  storeRememberMeParams,
  getPrevUrl,
  getRules,
  getInitialValues,
} from "./utils";

const { Item } = FormUI;

// TODO Добавить обработку rememberMe параметров из localStorage
export const Login = () => {
  const [form] = FormUI.useForm();
  const [t] = useTranslation(FORM_NAME);
  const history = useHistory();
  const rules = getRules(t);
  const initialValues = getInitialValues();
  const [submitLoading, setSubmitLoading] = useState(false);

  const onFinish = async (values: Store) => {
    try {
      setSubmitLoading(true);
      await axios.post(urls.login.submit, { ...values });
      storeRememberMeParams();

      logger.debug({
        message: t("authentication.successfull"),
        username: values[FIELDS.USERNAME],
      });

      const prevUrl = getPrevUrl(history);
      history.push(prevUrl);
    } catch ({ response: { data } }) {
      if (data) {
        logger.error({
          value: data.errorCode,
          message: data.errorDescription,
          username: values[FIELDS.USERNAME],
        });
        message.error(data.errorDescription || t("message.error"));
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleClickForgotPassword = (event: SyntheticEvent) => {
    const username = form.getFieldValue(FIELDS.USERNAME);
    history.push(urls.forgotPassword.path, { username });
    event.preventDefault();
  };

  return (
    <FormUI
      form={form}
      name={FORM_NAME}
      className={style.loginForm}
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
      <Item name={FIELDS.PASSWORD} rules={rules.password}>
        <Input.Password
          className={style.password}
          prefix={<LockOutlined />}
          type="password"
          placeholder={t("placeholder.password")}
        />
      </Item>
      <Item>
        <Item
          name={FIELDS.REMEMBER_ME}
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
          loading={submitLoading}
        >
          {t("submit.button")}
        </Button>
      </Item>
    </FormUI>
  );
};

export default Login;
