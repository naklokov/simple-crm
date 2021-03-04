import React, { useCallback, useState } from "react";
import { Drawer as DrawerUI, Form, PageHeader } from "antd";
import { FormFooter } from "../form-footer";
import { ComponentPermissionsChecker } from "../../wrappers";
import {
  createFormField,
  FormContext,
  isValuesChanged,
  useFormValues,
} from "../../utils";
import isEmpty from "lodash/isEmpty";
import { EntityOwnerProps, FieldProps } from "../../constants";
import { Store } from "antd/lib/form/interface";

interface DrawerFormProps {
  name: string;
  fields: FieldProps[];
  submitLoading: boolean;
  title: string | React.ReactNode;
  visible: boolean;
  defaultSubmitDisabled?: boolean;
  permissions?: string[];
  onFinish: (values: Store) => void;
  onClose: (event?: any) => void;
  headerButtons?: React.ReactNode[];
  initialValues?: EntityOwnerProps;
}

/**
 * Боковая форма с полями ввода
 *
 * @param {array} fields - Конфигурация полей ввода
 * @param {string} name - Наименование формы для хранения данных в контексте
 * @param {string} title - Текстовый заголовок формы
 * @param {boolean} visible - Признак видимости формы
 * @param {boolean} submitLoading - Признак отображения loader на кнопке "Сохранить"
 * @param {function} onClose - Callback при нажатии кнопки "Отмена"
 * @param {function} onFinish - Callback при нажатии кнопки "Сохранить"
 * @param {array} headerButtons - Массив дополнительных кнопок в заголовке
 * @param {boolean} defaultSubmitDisabled - Признак disable кнопки "Сохранить" при открытии боковой формы
 * @param {array} permissions - Разрешения для отображения кнопки "Сохранить"
 * @param {object} initialValues - Начальные значения полей ввода
 */
export const DrawerForm = ({
  fields,
  name,
  onFinish,
  submitLoading,
  title,
  onClose,
  visible,
  headerButtons,
  defaultSubmitDisabled = true,
  permissions = [],
  initialValues = {} as EntityOwnerProps,
}: DrawerFormProps) => {
  const [form] = Form.useForm();
  const [submitDisabled, setSubmitDisabled] = useState(defaultSubmitDisabled);
  const { clear } = useFormValues(name);

  const handleValuesChange = useCallback(
    (changed: Object, allValues: Object) => {
      const isChanged = isValuesChanged(initialValues, allValues);
      setSubmitDisabled(!isChanged);
    },
    [setSubmitDisabled, initialValues]
  );

  const handleClose = useCallback(() => {
    clear();
    onClose({});
  }, [onClose, clear]);

  const handleFinish = useCallback(
    (values: Store) => {
      const data = { ...initialValues, ...values };
      clear();
      onFinish(data);
    },
    [initialValues, onClose, onFinish, clear]
  );

  const handleVisibleChange = useCallback(
    (isVisible) => {
      if (!isVisible) {
        form.resetFields();
      }

      setSubmitDisabled(defaultSubmitDisabled);
    },
    [visible, defaultSubmitDisabled, form]
  );

  if (isEmpty(fields)) {
    return null;
  }

  return (
    <DrawerUI
      forceRender={true}
      title={
        <PageHeader
          style={{ padding: 0 }}
          title={title}
          extra={headerButtons}
        />
      }
      destroyOnClose={true}
      closeIcon={false}
      onClose={handleClose}
      afterVisibleChange={handleVisibleChange}
      visible={visible}
      footer={
        // для добавления никогда не будет сущности initialValues, поэтому сохранение будет доступно
        <ComponentPermissionsChecker
          hasRight={initialValues.isOwner?.UPDATE}
          availablePermissions={permissions}
        >
          <FormFooter
            form={form}
            loading={submitLoading}
            onCancel={onClose}
            disabled={submitDisabled}
          />
        </ComponentPermissionsChecker>
      }
    >
      <Form
        name={name}
        form={form}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        <FormContext.Provider value={form}>
          {fields?.map((field) => (
            // TODO подумать как оптимизировать права для ADD боковушек
            <ComponentPermissionsChecker
              key={field.fieldCode}
              availablePermissions={field.permissions}
              mode="readonly"
              hasRight={initialValues.isOwner?.UPDATE}
            >
              {createFormField(field)}
            </ComponentPermissionsChecker>
          ))}
        </FormContext.Provider>
      </Form>
    </DrawerUI>
  );
};

export default DrawerForm;
