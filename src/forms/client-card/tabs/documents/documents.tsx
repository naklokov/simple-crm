import React, { useCallback, useEffect, useState } from "react";
import { Button, Select, Space } from "antd";
import { useTranslation } from "react-i18next";

export const Documents = () => {
  const [t] = useTranslation("documents");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState();
  // const { response, loading } = useFetch({ url });

  // useEffect(() => {
  //   setOptions(response?.data ?? [])
  // }, [])

  const handleChange = useCallback((value) => {
    setSelected(value);
  }, []);

  const handleClick = useCallback(() => {
    alert("Сгенерировано!");
  }, []);

  return (
    <Space>
      <Select
        placeholder={t("select.placeholder")}
        onChange={handleChange}
        value={selected}
      >
        {options.map((o: any) => (
          <Select.Option key={o?.id} value={o?.id}>
            {o.title}
          </Select.Option>
        ))}
      </Select>
      <Button disabled={!selected} onClick={handleClick}>
        {t("button.title")}
      </Button>
    </Space>
  );
};
