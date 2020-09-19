import React, { SyntheticEvent, useState, useEffect } from "react";
import axios from "axios";
import { Form as FormUI, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import style from "./login.module.scss";
import { useHistory } from "react-router-dom";
import { Store } from "antd/lib/form/interface";
import { urls, http } from "../../constants";
import { logger, defaultErrorHandler, clearCookie } from "../../utils";
import { FORM_NAME, FIELDS } from "./constants";

import { storeRememberMeParams, getRules, getInitialValues } from "./utils";
import { setAuth as setAuthAction } from "../../__data__";
import { State } from "../../__data__/interfaces";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { LoginHeader } from "../../components";

const { Item } = FormUI;

interface LoginProps {
  setAuth: (auth: boolean) => void;
  auth: boolean;
}

// TODO Добавить обработку rememberMe параметров из localStorage
export const Login = ({ setAuth, auth }: LoginProps) => {
  const [form] = FormUI.useForm();
  const [t] = useTranslation(FORM_NAME);
  const history = useHistory();
  const rules = getRules(t);
  const initialValues = getInitialValues();
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  if (auth) {
    history.push(http.ROOT_URL);
  }

  const onFinish = async (values: Store) => {
    try {
      setSubmitLoading(true);
      await axios.post(urls.login.submit, values);
      storeRememberMeParams();

      logger.debug({
        message: t("authentication.successfull"),
        username: values[FIELDS.USERNAME],
      });

      setAuth(true);
      // дублирует переход на вкладку Клиенты, один переход тут, другой после выставления isAuth = true
      // history.push(http.ROOT_URL);
    } catch (error) {
      defaultErrorHandler({
        error,
        defaultErrorMessage: t("message.error"),
        username: values?.username,
      });
      setAuth(false);
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
    <div>
      <LoginHeader title={t("title")} />
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
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  auth: state?.persist?.auth ?? false,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuth: (isAuth: boolean) => {
    dispatch(setAuthAction(isAuth));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
