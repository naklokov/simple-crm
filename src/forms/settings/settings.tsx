import { SettingFilled, SettingOutlined } from "@ant-design/icons";
import { Button, Form, Tabs } from "antd";
import { Store } from "antd/lib/form/interface";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormFooter, FormHeader } from "../../components";
import {
  BREADCRUMB_ROUTES,
  FORM_NAMES,
  RecordType,
  urls,
} from "../../constants";
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
  const [loading, setLoading] = useState(false);

  const [initialSettings] = useFetch<RecordType>({
    url: urls.settings.entity,
    initial: {},
  });

  const breadcrumb = {
    routes: [...BREADCRUMB_ROUTES.SETTINGS],
    itemRender: getItemRender,
  };

  const handleFinish = useCallback(
    async (values: Store) => {
      console.log("values: ", values);
      setLoading(true);
      try {
        await axios.put(urls.settings.entity, values);
        defaultSuccessHandler(t("message.success"));
      } catch (error) {
        defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
      } finally {
        setLoading(false);
      }
    },
    [t]
  );
  console.log("initialSettings: ", initialSettings);

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
          initialValues={initialSettings}
          layout="vertical"
        >
          <ColorTheme />
        </Form>
        <FormFooter loading={loading} form={form} />
      </FormWrapper>
    </>
  );
};

export default Settings;
