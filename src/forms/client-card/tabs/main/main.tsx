import React, { useState } from "react";
import {
  GUTTER_FULL_WIDTH,
  ClientEntityProps,
  ModeType,
  TabProps,
  urls,
  QueryProps,
  FORM_NAMES,
} from "../../../../constants";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import {
  createFormField,
  isValuesChanged,
  defaultErrorHandler,
  defaultSuccessHandler,
  getUpdatedEntityArray,
  getFullUrl,
} from "../../../../utils";
import { Row, Form } from "antd";
import { FormFooter } from "../../../../components";
import { useParams, useHistory } from "react-router";
import {
  State,
  ProfileInfoProps,
  UpdateFormProps,
} from "../../../../__data__/interfaces";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { setClients, updateForm } from "../../../../__data__";
import { Store } from "antd/lib/form/interface";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/lib/form/Form";
import { getAddMetaValues, addClient, editClient } from "../../utils";

import style from "./main.module.scss";

interface MainProps {
  mode: ModeType;
  tab: TabProps;
  client: ClientEntityProps;
  profileInfo: ProfileInfoProps;
  updateForm: ({ name, data }: UpdateFormProps) => void;
}

export const Main = ({
  tab,
  client,
  profileInfo,
  updateForm,
  mode,
}: MainProps) => {
  const { id } = useParams<QueryProps>();
  const [form] = useForm();
  const history = useHistory();
  const [t] = useTranslation("clientCardMain");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const initialValues = mode === "add" ? getAddMetaValues(profileInfo) : client;

  const handleValuesChange = (changed: Object, allValues: Object) => {
    const isChanged = isValuesChanged(initialValues, allValues);
    setSubmitDisabled(!isChanged);
  };

  const onFinishAdd = async (values: Store) => {
    try {
      setSubmitLoading(true);
      const entity = await addClient({ ...initialValues, ...values });
      updateForm({ name: FORM_NAMES.CLIENT_CARD, data: entity });
      defaultSuccessHandler(t("message.success"));
      history.replace(getFullUrl(urls.clients.path, entity.id));
      setSubmitDisabled(true);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setSubmitLoading(false);
    }
  };

  const onFinishEdit = async (values: Store) => {
    try {
      setSubmitLoading(true);
      const entity = await editClient(id, { ...initialValues, ...values });
      updateForm({ name: FORM_NAMES.CLIENT_CARD, data: entity });

      defaultSuccessHandler(t("message.success"));
      setSubmitDisabled(true);
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <Form
        onValuesChange={handleValuesChange}
        onFinish={mode === "add" ? onFinishAdd : onFinishEdit}
        layout="vertical"
        name={"clientCardMain"}
        form={form}
        initialValues={initialValues}
      >
        <Row
          gutter={[GUTTER_FULL_WIDTH.HORIZONTAL, GUTTER_FULL_WIDTH.VERTICAL]}
        >
          {tab.fields?.map((field) => (
            <ComponentPermissionsChecker
              key={field.fieldCode}
              availablePermissions={field.permissions}
              mode="disabled"
            >
              {createFormField(field)}
            </ComponentPermissionsChecker>
          ))}
        </Row>
        <FormFooter
          loading={submitLoading}
          disabled={submitDisabled}
          withCancel={mode === "add"}
          onCancel={history.goBack}
        />
      </Form>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  client: state?.app?.forms?.[FORM_NAMES.CLIENT_CARD] ?? {},
  profileInfo: state?.data?.profileInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setClients, updateForm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
