import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Row, Form } from "antd";
import { useParams } from "react-router-dom";
import { Store } from "antd/lib/form/interface";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/lib/form/Form";

import { connect } from "react-redux";
import style from "./requisites.module.scss";
import { FormFooter } from "../../../../components";
import {
  createFormField,
  isValuesChanged,
  defaultErrorHandler,
  defaultSuccessHandler,
  useFormValues,
  FormContext,
  getFullUrl,
} from "../../../../utils";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import {
  GUTTER_FULL_WIDTH,
  QueryProps,
  FORM_NAMES,
  ProfileInfoProps,
  State,
  urls,
  ClientEntityProps,
  TabPaneFormProps,
} from "../../../../constants";

interface RequisitesProps extends TabPaneFormProps {
  profileInfo: ProfileInfoProps;
}

export const Requisites = ({ tab }: RequisitesProps) => {
  const { id } = useParams<QueryProps>();
  const [form] = useForm();
  const [t] = useTranslation("clientCardRequisites");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { values: clientValues, update } = useFormValues(
    FORM_NAMES.CLIENT_CARD
  );

  const handleValuesChange = (changed: Object, allValues: Object) => {
    const isChanged = isValuesChanged(clientValues, allValues);
    setSubmitDisabled(!isChanged);
  };

  const onFinish = async (values: Store) => {
    setSubmitLoading(true);
    const url = getFullUrl(urls.clientCard.entity, id);
    try {
      const response: AxiosResponse<ClientEntityProps> = await axios.put(url, {
        ...clientValues,
        ...values,
      });
      update(response?.data ?? {});

      defaultSuccessHandler(t("message.success"));
      setSubmitDisabled(true);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <Form
        onValuesChange={handleValuesChange}
        onFinish={onFinish}
        layout="vertical"
        name="clientCardRequisites"
        form={form}
        initialValues={clientValues}
      >
        <Row
          gutter={[GUTTER_FULL_WIDTH.HORIZONTAL, GUTTER_FULL_WIDTH.VERTICAL]}
        >
          <FormContext.Provider value={form}>
            {tab.fields?.map((field) => (
              <ComponentPermissionsChecker
                key={field.fieldCode}
                availablePermissions={field.permissions}
                hasRight={clientValues?.isOwner?.UPDATE}
                mode="readonly"
              >
                {createFormField(field)}
              </ComponentPermissionsChecker>
            ))}
          </FormContext.Provider>
        </Row>
        <ComponentPermissionsChecker hasRight={clientValues?.isOwner?.UPDATE}>
          <FormFooter
            loading={submitLoading}
            disabled={submitDisabled}
            withCancel={false}
          />
        </ComponentPermissionsChecker>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.data?.profileInfo,
});

export default connect(mapStateToProps)(Requisites);
