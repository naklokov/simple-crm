import React, { useState } from "react";
import {
  GUTTER_FULL_WIDTH,
  ClientEntityProps,
  TabProps,
  QueryProps,
  FORM_NAMES,
} from "../../../../constants";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import {
  createFormField,
  isValuesChanged,
  defaultErrorHandler,
  defaultSuccessHandler,
} from "../../../../utils";
import { Row, Form } from "antd";
import { FormFooter } from "../../../../components";
import { useParams } from "react-router";
import { State, UpdateFormProps } from "../../../../__data__/interfaces";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { updateForm } from "../../../../__data__";
import { Store } from "antd/lib/form/interface";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/lib/form/Form";
import { editClient, getClient } from "../../utils";

import style from "./requisites.module.scss";

interface RequisitesProps {
  tab: TabProps;
  client: ClientEntityProps;
  updateForm: ({ name, data }: UpdateFormProps) => void;
}

export const Requisites = ({ tab, client, updateForm }: RequisitesProps) => {
  const { id } = useParams<QueryProps>();
  const [form] = useForm();
  const [t] = useTranslation("clientCardRequisites");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleValuesChange = (changed: Object, allValues: Object) => {
    const isChanged = isValuesChanged(client, allValues);
    setSubmitDisabled(!isChanged);
  };

  const onFinish = async (values: Store) => {
    try {
      setSubmitLoading(true);
      const entity = await editClient(id, { ...client, ...values });
      updateForm({ name: FORM_NAMES.CLIENT_CARD, data: entity });

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
        initialValues={client}
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
          withCancel={false}
        />
      </Form>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  client: state?.app?.forms?.[FORM_NAMES.CLIENT_CARD] ?? {},
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ updateForm }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Requisites);
