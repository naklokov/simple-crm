import React, { useState } from "react";
import axios from "axios";
import { Form, Typography, Row, Button, message } from "antd";
import { FORM_NAME } from "./constansts";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setLoading, setProfileInfo } from "../../../../__data__";
import { State, ProfileInfoProps } from "../../../../__data__/interfaces";
import { getFields } from "./fields";
import { useTranslation } from "react-i18next";
import { createFormField, isValuesChanged, logger } from "../../../../utils";
import { GUTTER_FULL_WIDTH, urls } from "../../../../constants";

import style from "./main.module.scss";
import { Store } from "antd/lib/form/interface";
import { FormFooter } from "../../../../components";

interface MainProps {
  profileInfo: ProfileInfoProps;
  setProfile: (profileInfo: ProfileInfoProps) => void;
  setLoading: (loading: boolean) => void;
}

export const Main = ({ profileInfo, setProfile }: MainProps) => {
  const [form] = Form.useForm();
  const [t] = useTranslation(FORM_NAME);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleValuesChange = (changed: Object, allValues: Object) => {
    const isChanged = isValuesChanged(profileInfo, allValues);
    setSubmitDisabled(!isChanged);
  };

  const onFinish = async (values: Store) => {
    try {
      setSubmitLoading(true);
      const responce = await axios.put(urls.profile.info, {
        ...profileInfo,
        ...values,
      });

      setProfile(responce.data);
      setSubmitDisabled(true);
      logger.debug(t("message.success"));
      message.success(t("message.success"));
    } catch (error) {
      const data = error?.response?.data ?? {};
      message.error(data.errorDescription || t("message.error"));
      logger.error({
        value: data.errorCode,
        message: data.errorDescription,
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <Typography.Title level={4}>{t("title")}</Typography.Title>
      <Form
        onValuesChange={handleValuesChange}
        onFinish={onFinish}
        layout="vertical"
        name={FORM_NAME}
        form={form}
        initialValues={profileInfo}
      >
        <Row
          gutter={[GUTTER_FULL_WIDTH.HORIZONTAL, GUTTER_FULL_WIDTH.VERTICAL]}
        >
          {getFields(t).map((field) => createFormField(field))}
        </Row>
        <FormFooter loading={submitLoading} disabled={submitDisabled} />
      </Form>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProfile: (profileInfo: ProfileInfoProps) => {
    dispatch(setProfileInfo(profileInfo));
  },
  setLoading: (loading: boolean) => dispatch(setLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
