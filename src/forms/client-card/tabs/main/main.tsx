import React, { useState } from "react";
import {
  GUTTER_FULL_WIDTH,
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
  getFullUrl,
  useFormValues,
} from "../../../../utils";
import { Row, Form } from "antd";
import { FormFooter } from "../../../../components";
import { useParams, useHistory } from "react-router";
import { State, ProfileInfoProps } from "../../../../__data__/interfaces";
import { connect } from "react-redux";
import { Store } from "antd/lib/form/interface";
import { useTranslation } from "react-i18next";
import { getAddMetaValues, addClient, editClient } from "../../utils";

import style from "./main.module.scss";

interface MainProps {
  mode: ModeType;
  tab: TabProps;
  profileInfo: ProfileInfoProps;
}

export const Main = ({ tab, profileInfo, mode }: MainProps) => {
  const { id } = useParams<QueryProps>();
  const [form] = Form.useForm();
  const history = useHistory();
  const [t] = useTranslation("clientCardMain");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { values, update } = useFormValues(FORM_NAMES.CLIENT_CARD);

  const initialValues = mode === "add" ? getAddMetaValues(profileInfo) : values;

  const handleValuesChange = (changed: Object, allValues: Object) => {
    const isChanged = isValuesChanged(initialValues, allValues);
    setSubmitDisabled(!isChanged);
  };

  const onFinishAdd = async (values: Store) => {
    setSubmitLoading(true);
    try {
      const data = { ...initialValues, ...values };
      const entity = await addClient(data);
      update(data);

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
    setSubmitLoading(true);
    try {
      const data = { ...initialValues, ...values };
      await editClient(id, data);
      update(data);

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
  profileInfo: state?.data?.profileInfo,
});

export default connect(mapStateToProps)(Main);
