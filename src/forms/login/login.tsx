import React, { SyntheticEvent, useState, useEffect } from "react";
import axios from "axios";
import { Form as FormUI, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import { useHistory, useLocation } from "react-router-dom";
import { Store } from "antd/lib/form/interface";
import { Dispatch } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import style from "./login.module.scss";
import { urls, State, LocationLogoutProps } from "../../constants";
import { logger, defaultErrorHandler } from "../../utils";
import { FORM_NAME, FIELDS } from "./constants";

import { getRules, getInitialValues } from "./utils";
import { setAuth as setAuthAction } from "../../__data__";
import { LoginHeader } from "../../components";

const { Item } = FormUI;

interface LoginProps {
  setAuth: (auth: boolean) => void;
  auth: boolean;
}

export const Login = ({ setAuth, auth }: LoginProps) => {
  const [form] = FormUI.useForm();
  const [t] = useTranslation(FORM_NAME);
  const history = useHistory();
  const rules = getRules(t);
  const initialValues = getInitialValues();
  const [submitLoading, setSubmitLoading] = useState(false);
  const location = useLocation<LocationLogoutProps>();

  useEffect(() => {
    localStorage.clear();
  }, []);

  if (auth) {
    history.push(urls.main.path);
  }

  const onFinish = async (values: Store) => {
    try {
      setSubmitLoading(true);
      await axios.post(urls.login.submit, values);

      logger.debug({
        message: t("authentication.successfull"),
        username: values[FIELDS.USERNAME],
      });

      setAuth(true);
      const from = location?.state?.from;
      if (from) {
        history.push(from);
      }
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
  auth: state?.persist?.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuth: (isAuth: boolean) => {
    dispatch(setAuthAction(isAuth));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
