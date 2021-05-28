import React, { useCallback } from "react";
import { Button, Form, Row } from "antd";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { isEqual, pick } from "lodash";
import {
  DepartmentEntityProps,
  EntityOwnerProps,
  FORM_NAMES,
  GUTTER_FULL_WIDTH,
  TabProps,
} from "../../../../../../constants";
import {
  createFormField,
  defaultErrorHandler,
  defaultSuccessHandler,
  useFormValues,
} from "../../../../../../utils";
import { ComponentPermissionsChecker } from "../../../../../../wrappers";
import { setFormLoading } from "../../../../../../__data__";

interface FieldsProps {
  tab: TabProps;
}

const isEqualVisible = (values: EntityOwnerProps, all: EntityOwnerProps) => {
  const pickedAll = pick(all, Object.keys(values));
  return isEqual(pickedAll, values);
};

export const Fields: React.FC<FieldsProps> = ({ tab }) => {
  const url = tab?._links?.self?.href;
  const dispatch = useDispatch();
  const [t] = useTranslation("departmentInformation");
  const [form] = Form.useForm();
  const [department, setDepartment] = useFormValues<DepartmentEntityProps>(
    FORM_NAMES.DEPARTMENT_CARD
  );

  const handleBlur = useCallback(() => {
    const values = form.getFieldsValue();
    if (!isEqualVisible(values, department)) {
      form.submit();
    }
  }, [form, department]);

  const handleFinish = useCallback(
    async (values: EntityOwnerProps) => {
      if (url) {
        dispatch(setFormLoading({ name: tab.tabCode, loading: true }));
        try {
          const response = await axios({
            url,
            method: "PUT",
            data: values,
          });

          const data = response?.data ?? {};
          form.setFieldsValue(data);
          setDepartment(data);
          defaultSuccessHandler(t("fields.update.message.success"));
        } catch (error) {
          defaultErrorHandler({
            error,
          });
        } finally {
          dispatch(setFormLoading({ name: tab.tabCode, loading: false }));
        }
      }
    },
    [form, t, url, tab.tabCode, setDepartment, dispatch]
  );

  return (
    <Form
      onFinish={handleFinish}
      layout="vertical"
      name={tab?.tabCode}
      form={form}
      initialValues={department}
      onBlur={handleBlur}
    >
      <Row gutter={GUTTER_FULL_WIDTH.HORIZONTAL}>
        {tab?.fields?.map((field) => (
          <ComponentPermissionsChecker
            key={field.fieldCode}
            hasRight={department?.isOwner?.UPDATE}
            availablePermissions={field.permissions}
            mode="readonly"
          >
            {createFormField(field)}
          </ComponentPermissionsChecker>
        ))}
      </Row>
    </Form>
  );
};

export default Fields;
