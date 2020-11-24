import React, { useState } from "react";
import axios from "axios";
import {
  GUTTER_FULL_WIDTH,
  ModeType,
  TabProps,
  urls,
  QueryProps,
  FORM_NAMES,
  PERMISSIONS_SET,
  State,
  ProfileInfoProps,
  ClientEntityProps,
} from "../../../../constants";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import {
  createFormField,
  isValuesChanged,
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
  useFormValues,
  FormContext,
} from "../../../../utils";
import { Row, Form } from "antd";
import { FormFooter } from "../../../../components";
import { useParams, useHistory } from "react-router";
import { connect } from "react-redux";
import { Store } from "antd/lib/form/interface";
import { useTranslation } from "react-i18next";
import { getAddMetaValues } from "../../utils";

import style from "./main.module.scss";
import { AxiosResponse } from "axios";

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
    const url = urls.clients.entity;
    try {
      const response: AxiosResponse<ClientEntityProps> = await axios.post(url, {
        ...initialValues,
        ...values,
      });
      update(response?.data ?? {});

      defaultSuccessHandler(t("message.success"));
      history.replace(getFullUrl(urls.clients.path, response?.data?.id));
      setSubmitDisabled(true);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setSubmitLoading(false);
    }
  };

  const onFinishEdit = async (values: Store) => {
    setSubmitLoading(true);
    const url = getFullUrl(urls.clientCard.entity, id);
    try {
      const response: AxiosResponse<ClientEntityProps> = await axios.put(url, {
        ...initialValues,
        ...values,
      });
      update(response?.data ?? {});

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
          <FormContext.Provider value={form}>
            {tab.fields?.map((field) => (
              <ComponentPermissionsChecker
                key={field.fieldCode}
                availablePermissions={field.permissions}
                mode="readonly"
                hasRight={values?.isOwner?.UPDATE}
                field={field.fieldCode}
              >
                {createFormField(field)}
              </ComponentPermissionsChecker>
            ))}
          </FormContext.Provider>
        </Row>
        <ComponentPermissionsChecker
          availablePermissions={PERMISSIONS_SET.CLIENT_UPDATE}
          hasRight={values?.isOwner?.UPDATE}
        >
          <FormFooter
            loading={submitLoading}
            disabled={submitDisabled}
            withCancel={mode === "add"}
            onCancel={history.goBack}
          />
        </ComponentPermissionsChecker>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

export default connect(mapStateToProps)(Main);
