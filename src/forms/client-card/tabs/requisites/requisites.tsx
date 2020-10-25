import React, { useState } from "react";
import {
  GUTTER_FULL_WIDTH,
  TabProps,
  QueryProps,
  FORM_NAMES,
  PERMISSIONS_SET,
  ProfileInfoProps,
  State,
} from "../../../../constants";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import {
  createFormField,
  isValuesChanged,
  defaultErrorHandler,
  defaultSuccessHandler,
  useFormValues,
  FormContext,
} from "../../../../utils";
import { Row, Form } from "antd";
import { FormFooter } from "../../../../components";
import { useParams } from "react-router";
import { Store } from "antd/lib/form/interface";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/lib/form/Form";
import { editClient } from "../../utils";

import style from "./requisites.module.scss";
import { connect } from "react-redux";

interface RequisitesProps {
  tab: TabProps;
  profileInfo: ProfileInfoProps;
}

export const Requisites = ({ tab, profileInfo }: RequisitesProps) => {
  const { id } = useParams<QueryProps>();
  const [form] = useForm();
  const [t] = useTranslation("clientCardRequisites");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { values, update } = useFormValues(FORM_NAMES.CLIENT_CARD);

  const handleValuesChange = (changed: Object, allValues: Object) => {
    const isChanged = isValuesChanged(values, allValues);
    setSubmitDisabled(!isChanged);
  };

  const onFinish = async (submitedValues: Store) => {
    try {
      setSubmitLoading(true);
      const data = { ...values, ...submitedValues };
      await editClient(id, data);
      update(data);

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
        name={"clientCardRequisites"}
        form={form}
        initialValues={values}
      >
        <Row
          gutter={[GUTTER_FULL_WIDTH.HORIZONTAL, GUTTER_FULL_WIDTH.VERTICAL]}
        >
          <FormContext.Provider value={form}>
            {tab.fields?.map((field) => (
              <ComponentPermissionsChecker
                key={field.fieldCode}
                availablePermissions={field.permissions}
                hasRight={values?.isOwner?.UPDATE}
                mode="readonly"
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
