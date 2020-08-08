import React from "react";
import { Form, Input, Typography, Row } from "antd";
import { FORM_NAME } from "./constansts";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { setLoading, setProfileInfo } from "../../../../__data__";
import { State, ProfileInfoProps } from "../../../../__data__/interfaces";
import style from "./main.module.scss";
import { getForm } from "./utils";
import { useTranslation } from "react-i18next";
import { createFormField } from "../../../../utils";

interface MainProps {
  profileInfo: ProfileInfoProps;
  setProfile: (profileInfo: ProfileInfoProps) => void;
  setLoading: (loading: boolean) => void;
}

export const Main = ({ profileInfo, setProfile, setLoading }: MainProps) => {
  const [form] = Form.useForm();
  const [t] = useTranslation(FORM_NAME);
  const { title, fields } = getForm(t);

  return (
    <div className={style.container}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Form
        layout="vertical"
        name={FORM_NAME}
        form={form}
        initialValues={profileInfo}
      >
        <Row gutter={[128, 16]}>
          {fields.map((field) => createFormField(field))}
        </Row>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProfile: (profileInfo: ProfileInfoProps) => {
    dispatch(setProfileInfo(profileInfo));
  },
  setLoading: (loading: boolean) => dispatch(setLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
