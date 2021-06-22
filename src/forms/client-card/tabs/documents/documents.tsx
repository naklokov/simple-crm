import React, { useCallback, useState } from "react";
import axios from "axios";
import { Button, Select, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  QueryProps,
  TabPaneFormProps,
  TemplateEntityProps,
  urls,
} from "../../../../constants";
import {
  defaultErrorHandler,
  downloadFile,
  getFullUrl,
  getRsqlParams,
  useFetch,
} from "../../../../utils";
import { FormWrapper } from "../../../../wrappers";

const DEFAULT_EXTENSION = "docx";

export const Documents: React.FC<TabPaneFormProps> = ({ formName }) => {
  const [t] = useTranslation("documents");
  const [selectedTemplate, setSelectedTemplate] = useState<
    TemplateEntityProps
  >();
  const { id: entityId } = useParams<QueryProps>();
  const query = getRsqlParams([{ key: "linkedEntityType", value: "CLIENTS" }]);
  const [templates, loading] = useFetch<TemplateEntityProps[]>({
    url: urls.templates.entity,
    params: { query },
  });

  const generateDocument = useCallback(async () => {
    const {
      id,
      fileExtension = DEFAULT_EXTENSION,
      templateName = t("template.name.default"),
    } = selectedTemplate || {};

    try {
      const url = getFullUrl(urls.templates.generation, id);
      const { data } = await axios.post(
        url,
        { entityId },
        // без этого параметра входной массив байт парсится некорректно и в Blob не преобразуется
        { responseType: "arraybuffer" }
      );

      const fileName = `${templateName}.${fileExtension}`;
      downloadFile(data, fileName);
    } catch (error) {
      defaultErrorHandler({ error });
    }
  }, [entityId, t, selectedTemplate]);

  const handleChange = useCallback(
    (templateId: string) => {
      const template = templates.find(({ id }) => templateId === id);

      if (template) {
        setSelectedTemplate(template);
      }
    },
    [templates]
  );

  const handleClick = useCallback(() => {
    generateDocument();
  }, [generateDocument]);

  return (
    <FormWrapper name={formName}>
      <Space>
        <Select
          placeholder={t("select.placeholder")}
          onChange={handleChange}
          value={selectedTemplate?.id}
          loading={loading}
        >
          {templates.map(({ id, templateName }) => (
            <Select.Option key={id} value={id}>
              {templateName}
            </Select.Option>
          ))}
        </Select>
        <Button disabled={!selectedTemplate} onClick={handleClick}>
          {t("button.title")}
        </Button>
      </Space>
    </FormWrapper>
  );
};
