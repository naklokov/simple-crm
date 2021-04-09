import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Select, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { QueryProps, TemplateEntityProps, urls } from "../../../../constants";
import {
  defaultErrorHandler,
  downloadFile,
  getFullUrl,
  getRsqlParams,
  useFetch,
} from "../../../../utils";

const DEFAULT_EXTENSION = "docx";

export const Documents = () => {
  const [t] = useTranslation("documents");
  const [options, setOptions] = useState<TemplateEntityProps[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<
    TemplateEntityProps
  >();
  const { id: entityId } = useParams<QueryProps>();
  const query = getRsqlParams([{ key: "linkedEntityType", value: "CLIENTS" }]);
  const { response, loading } = useFetch({
    url: urls.templates.entity,
    params: { query },
  });

  useEffect(() => {
    setOptions(response?.data ?? []);
  }, [response?.data]);

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
      const template = options.find(({ id }) => templateId === id);

      if (template) {
        setSelectedTemplate(template);
      }
    },
    [options]
  );

  const handleClick = useCallback(() => {
    generateDocument();
  }, [generateDocument]);

  return (
    <form>
      <Space>
        <Select
          placeholder={t("select.placeholder")}
          onChange={handleChange}
          value={selectedTemplate?.id}
          loading={loading}
        >
          {options.map(({ id, templateName }) => (
            <Select.Option key={id} value={id}>
              {templateName}
            </Select.Option>
          ))}
        </Select>
        <Button disabled={!selectedTemplate} onClick={handleClick}>
          {t("button.title")}
        </Button>
      </Space>
    </form>
  );
};
