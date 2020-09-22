import React, { useEffect, useRef, useState, useContext } from "react";
import { Input, Form, InputNumber } from "antd";
import { noop, isEqual } from "lodash";

import style from "../table.module.scss";
import { defaultErrorHandler } from "../../../utils";
import { ColumnProps } from "../../../constants";
import { useTranslation } from "react-i18next";

const EditableContext = React.createContext<any>("");

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form key={index} form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  onSaveRow,
  ...restProps
}: any) => {
  const [t] = useTranslation("clientCardPriceList");
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef?.current?.focus?.() ?? noop();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      const updatedRecord = { ...record, ...values };
      if (!isEqual(updatedRecord, record)) {
        onSaveRow(updatedRecord);
      }
    } catch (error) {
      defaultErrorHandler({
        error,
        defaultErrorMessage: t("message.row.save.error"),
      });
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: t("rules.editable.price"),
          },
        ]}
      >
        <InputNumber
          min={0}
          step={100}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          }
          parser={(value) => value?.replace(/\s/g, "") ?? ""}
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div
        className={style.editableCellValueWrap}
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export const getEditableProp = (
  column: ColumnProps,
  onSaveRow: (record: any) => void
) => {
  if (column.editable) {
    return {
      onCell: (record: any) => ({
        record,
        editable: column.editable,
        dataIndex: column.columnCode,
        title: column.columnName,
        onSaveRow,
      }),
    };
  }
  return {};
};

export const getEditableTableBody = () => ({
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
});
