import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  FieldProps,
  GUTTER_FULL_WIDTH,
  ClientEntityProps,
  urls,
  CLIENT_NEW_ID,
} from "../../../../constants";
import moment from "moment";
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
import { Row, message, Form } from "antd";
import { Loader, FormFooter } from "../../../../components";
import { useParams } from "react-router";
import { State, ProfileInfoProps } from "../../../../__data__/interfaces";
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
  profileInfo: ProfileInfoProps;
  setClients: (clients: ClientEntityProps[]) => void;
}

// TODO поля сфера деятельности
export const Main = ({
  fields,
  clients,
  profileInfo,
  setClients,
}: MainProps) => {
  const [form] = useForm();
  const [t] = useTranslation("clientCardMain");
  const { id } = useParams();
  const isAdding = id === CLIENT_NEW_ID;
  let client =
    clients.find((item) => item.id === id) || ({} as ClientEntityProps);

  // TODO до реализации 1 запроса данные поля заполняеются по умолчанию на фронте
  if (isAdding) {
    const initialValues = {
      managerId: profileInfo.id ?? "",
      creationDate: moment().toISOString(),
    };
    client = { ...client, ...initialValues };
  }

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleValuesChange = (changed: Object, allValues: Object) => {
    const isChanged = isValuesChanged(client, allValues);
    setSubmitDisabled(!isChanged);
  };

  const putClient = async (values: Store) => {
    const url = fillTemplate(urls.clientCard.entity, { id });
    const data = { ...client, ...values };
    const response: AxiosResponse<ClientEntityProps> = await axios.put(
      url,
      data
    );

    return response?.data ?? {};
  };

  const postClient = async (values: Store) => {
    const url = urls.clients.entity;
    const data = { ...client, ...values };
    const response: AxiosResponse<ClientEntityProps> = await axios.post(
      url,
      data
    );
    return response?.data ?? {};
  };

  const onFinish = async (values: Store) => {
    try {
      setSubmitLoading(true);
      const clientData = isAdding
        ? await postClient(values)
        : await putClient(values);

      setClients(getUpdatedClients(clientData, clients));
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
  profileInfo: state?.persist?.profileInfo ?? {},
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setClients }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
