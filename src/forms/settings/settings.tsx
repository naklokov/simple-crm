import { SettingOutlined } from "@ant-design/icons";
import { Form, Tabs } from "antd";
import { Store } from "antd/lib/form/interface";
import axios from "axios";
import { isEmpty } from "lodash";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormFooter, FormHeader } from "../../components";
import { BREADCRUMB_ROUTES, RecordType, urls } from "../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getItemRender,
  useFetch,
} from "../../utils";
import { FormWrapper } from "../../wrappers";
import { ColorTheme } from "./components";

export const Settings = () => {
  const [form] = Form.useForm();
  const [t] = useTranslation("settings");
  const [submitLoading, setSubmitLoading] = useState(false);

  const [initial, loading] = useFetch<RecordType>({
    url: urls.settings.entity,
    initial: {},
  });

  const breadcrumb = {
    routes: [...BREADCRUMB_ROUTES.SETTINGS],
    itemRender: getItemRender,
  };

  const handleFinish = useCallback(
    async (values: Store) => {
      setSubmitLoading(true);
      try {
        await axios.put(urls.settings.entity, values);
        defaultSuccessHandler(t("message.success"));
        window.location.reload();
      } catch (error) {
        defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
      } finally {
        setSubmitLoading(false);
      }
    },
    [t]
  );

  if (loading) {
    return (
      <FormWrapper>
        <div style={{ height: "150px" }} />
      </FormWrapper>
    );
  }

  return (
    <>
      <FormHeader
        avatar={{
          icon: <SettingOutlined />,
          size: 64,
        }}
        title={t("title")}
        breadcrumb={breadcrumb}
        footer={
          <Tabs>
            <Tabs.TabPane key="personalize" tab="Персонализация" />
          </Tabs>
        }
      />
      <FormWrapper>
        <Form
          form={form}
          onFinish={handleFinish}
          initialValues={initial}
          layout="vertical"
        >
          <ColorTheme />
        </Form>
        <FormFooter
          form={form}
          loading={submitLoading}
          submitText={t("submit.text")}
        />
      </FormWrapper>
    </>
  );
};

export default Settings;
