import React, { useState } from "react";
import {
  GUTTER_FULL_WIDTH,
  ClientEntityProps,
  TabProps,
  QueryProps,
} from "../../../../constants";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import {
  createFormField,
  isValuesChanged,
  defaultErrorHandler,
  defaultSuccessHandler,
  getUpdatedEntityArray,
} from "../../../../utils";
import isEmpty from "lodash/isEmpty";
import { Row, Form } from "antd";
import { Loader, FormFooter } from "../../../../components";
import { useParams } from "react-router";
import { State } from "../../../../__data__/interfaces";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { setClients } from "../../../../__data__";
import { Store } from "antd/lib/form/interface";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/lib/form/Form";
import { editClient, getClient } from "../../utils";

import style from "./requisites.module.scss";

interface RequisitesProps {
  tab: TabProps;
  clients: ClientEntityProps[];
  setClients: (clients: ClientEntityProps[]) => void;
}

export const Requisites = ({ tab, clients, setClients }: RequisitesProps) => {
  const { id } = useParams<QueryProps>();
  const [form] = useForm();
  const [t] = useTranslation("clientCardRequisites");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const client = getClient(id, clients);

  const handleValuesChange = (changed: Object, allValues: Object) => {
    const isChanged = isValuesChanged(client, allValues);
    setSubmitDisabled(!isChanged);
  };

  const onFinish = async (values: Store) => {
    try {
      setSubmitLoading(true);
      const entity = await editClient(id, { ...client, ...values });
      const updated = getUpdatedEntityArray(entity, clients);
      setClients(updated);

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
  clients: state?.data?.clients,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setClients }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Requisites);
