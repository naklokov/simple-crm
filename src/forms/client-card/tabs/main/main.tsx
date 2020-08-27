import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import {
  FieldProps,
  GUTTER_FULL_WIDTH,
  ClientEntityProps,
  urls,
  PERMISSIONS,
  CLIENT_NEW_ID,
} from "../../../../constants";
import style from "./main.module.scss";
import { ComponentPermissionsChecker } from "../../../../wrappers";
import {
  createFormField,
  isValuesChanged,
  defaultErrorHandler,
  logger,
  fillTemplate,
} from "../../../../utils";
import isEmpty from "lodash/isEmpty";
import { Row, message, Button, Form } from "antd";
import { Loader, FormFooter } from "../../../../components";
import { useParams } from "react-router";
import { State } from "../../../../__data__/interfaces";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import { setClients } from "../../../../__data__";
import { Store } from "antd/lib/form/interface";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/lib/form/Form";
import { getUpdatedClients } from "../../utils";

interface MainProps {
  fields: FieldProps[];
  clients: ClientEntityProps[];
  setClients: (clients: ClientEntityProps[]) => void;
}

const {
  CLIENTS: { UPDATE, UPDATE_OWNER, ADMIN },
} = PERMISSIONS;

export const Main = ({ fields, clients, setClients }: MainProps) => {
  const [form] = useForm();
  const [t] = useTranslation("clientCardMain");
  const { id } = useParams();
  const client =
    clients.find((item) => item.id === id) || ({} as ClientEntityProps);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleValuesChange = (changed: Object, allValues: Object) => {
    const isChanged = isValuesChanged(client, allValues);
    setSubmitDisabled(!isChanged);
  };

  // путь для сохранения новой сущности
  // что писать в дату создания
  //
  const onFinish = async (values: Store) => {
    try {
      setSubmitLoading(true);
      const method = id === CLIENT_NEW_ID ? axios.post : axios.put;
      const responce = await method(
        fillTemplate(urls.clientCard.entity, { id }),
        { ...client, ...values }
      );
      const newClient = responce?.data ?? ({} as ClientEntityProps);

      setClients(getUpdatedClients(newClient, clients));
      setSubmitDisabled(true);
      logger.debug(t("message.success"));
      message.success(t("message.success"));
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (isEmpty(clients)) {
    return <Loader />;
  }

  return (
    <div className={style.container}>
      <Form
        onValuesChange={handleValuesChange}
        onFinish={onFinish}
        layout="vertical"
        name={"clientCardMain"}
        form={form}
        initialValues={client}
      >
        <Row
          gutter={[GUTTER_FULL_WIDTH.HORIZONTAL, GUTTER_FULL_WIDTH.VERTICAL]}
        >
          {fields.map((field) => (
            <ComponentPermissionsChecker
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
  clients: state?.clients ?? [],
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setClients }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
