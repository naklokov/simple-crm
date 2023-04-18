import React, { useEffect, useRef, useState, useContext, useMemo } from "react";
import { Input, Form, InputNumber } from "antd";
import { noop, isEqual, toNumber } from "lodash";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import style from "../table.module.scss";
import {
  defaultErrorHandler,
  useFormValues,
  FormContext,
} from "../../../utils";
import {
  ClientEntityProps,
  ColumnProps,
  FORM_NAMES,
  State,
} from "../../../constants";
import { isCanShow } from "../../../wrappers/permissions-checker/utils";
import { TableActionsContext } from "./context";

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form key={index} form={form} component={false}>
      <FormContext.Provider value={{ form, name: "editableRow" }}>
        <tr {...props} />
      </FormContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  permissions = [],
  ...restProps
}: any) => {
  const [t] = useTranslation("clientCardPriceList");
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { form } = useContext(FormContext);
  const { onSaveRow } = useContext(TableActionsContext);
  const [formValues] = useFormValues<ClientEntityProps>(FORM_NAMES.CLIENT_CARD);
  const allPermissions = useSelector(
    (state: State) => state?.persist?.permissions
  );

  const canShow = useMemo(
    () => isCanShow(permissions, allPermissions, formValues?.isOwner?.UPDATE),
    [permissions, allPermissions, formValues]
  );

  useEffect(() => {
    if (editing && canShow) {
      inputRef?.current?.focus?.() ?? noop();
    }
  }, [editing, canShow]);

  const toggleEdit = () => {
    setEditing(!editing);
    form?.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form?.validateFields();

      toggleEdit();
      const updatedRecord = { ...record, ...values };
      if (!isEqual(updatedRecord, record)) {
        onSaveRow(updatedRecord);
      }
    } catch (error) {
      defaultErrorHandler({
        error,
      });
    }
  };

  let childNode = children;

  const formatterFunction = useMemo(
    () => (value?: number | string) =>
      `${value}`?.replace(/\B(?=(\d{3})+(?!\d))/g, " "),
    []
  );

  const parserFunction = useMemo(
    () => (value?: string) => (value ? toNumber(value.replace(/\D/g, "")) : ""),
    []
  );

  if (editable && canShow) {
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
          maxLength={11}
          formatter={formatterFunction}
          parser={parserFunction}
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      // eslint-disable-next-line
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
  permissions: string[] = []
) => {
  if (column.editable) {
    return {
      onCell: (record: any) => ({
        record,
        fixed: column.fixed,
        editable: column.editable,
        dataIndex: column.columnCode,
        title: column.columnName,
        permissions,
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
