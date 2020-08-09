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
      const responce = await axios.put(
        `${urls.profile.entity}/${profileInfo.businessId}`,
        {
          ...profileInfo,
          ...values,
        }
      );

      setProfile(responce.data);
      setSubmitDisabled(true);
      logger.debug(t("message.success"));
      message.success(t("message.success"));
    } catch ({ response: { data } }) {
      logger.error({
        value: data.errorCode,
        message: data.errorDescription,
      });

      message.error(data.errorDescription || t("message.error"));
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
        <Form.Item className={style.submitItem}>
          <Button
            type="primary"
            htmlType="submit"
            className={style.submitButton}
            loading={submitLoading}
            disabled={submitDisabled}
          >
            {t("submit.button")}
          </Button>
        </Form.Item>
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