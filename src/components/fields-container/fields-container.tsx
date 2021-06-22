import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createFormField,
  defaultErrorHandler,
  defaultSuccessHandler,
  FormContext,
  isValuesChanged,
} from "../../utils";
import {
  EntityOwnerProps,
  GUTTER_FULL_WIDTH,
  MethodType,
  TabPaneFormProps,
} from "../../constants";
import { setFormLoading } from "../../__data__";
import { ComponentPermissionsChecker, FormWrapper } from "../../wrappers";
import { FormFooter } from "../form-footer";

interface FieldsContainerProps extends TabPaneFormProps {
  xhrMethod?: MethodType;
  onFinish?: (values: EntityOwnerProps) => void;
  defaultValues?: any;
  defaultUrl?: string;
  withCancel?: boolean;
  initialLoad?: boolean;
}

/**
 *
 * @param tab  Полный конфиг табы
 * @param formName Имя формы для хранения данных
 * @param onFinish Метод вызываемый после успешного submit данных
 * @param defaultValues Значения по умолчанию (при initialLoad=true добавляются к запросу, а при initialLoad=false выставляются как initialValues)
 * @param xhrMethod Метод axios при submit сущности
 * @param defaultUrl адрес для xhr запросов
 * @param withCancel Отображать ли cancel кнопку в подвале формы
 * @param initialLoad Нужна ли начальная загрузка при инициализации формы
 * @returns Контейнер с полями для ввода и редактирования данных
 */
export const FieldsContainer: React.FC<FieldsContainerProps> = ({
  tab,
  formName = "",
  onFinish,
  defaultValues,
  defaultUrl,
  xhrMethod = "put",
  withCancel = true,
  initialLoad = true,
}) => {
  const url = defaultUrl || tab?._links?.self?.href;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [t] = useTranslation(formName);
  const history = useHistory();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState<EntityOwnerProps>();

  const fetchInitialValues = useCallback(async () => {
    dispatch(setFormLoading({ name: formName, loading: true }));
    try {
      const response = await axios.get(url);
      const data = response?.data ?? {};
      setInitialValues({ ...defaultValues, ...data });
    } catch (error) {
      defaultErrorHandler({
        error,
        defaultErrorMessage: t("message.error"),
      });
    } finally {
      dispatch(setFormLoading({ name: formName, loading: false }));
    }
  }, [url, defaultValues, dispatch, t, formName]);

  useEffect(() => {
    if (initialLoad) {
      fetchInitialValues();
    } else {
      setInitialValues(defaultValues);
    }
  }, [initialLoad, defaultValues, form, fetchInitialValues]);

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const handleValuesChange = (changed: Object, allValues: Object) => {
    if (!initialValues) {
      setSubmitDisabled(true);
      return;
    }

    const isChanged = isValuesChanged(initialValues, allValues);
    setSubmitDisabled(!isChanged);
  };

  const handleGoBack = useCallback(() => {
    history.go(-1);
  }, [history]);

  const handleFinish = useCallback(
    async (values: EntityOwnerProps) => {
      if (url) {
        try {
          setSubmitLoading(true);
          const response = await axios({
            url,
            method: xhrMethod,
            data: {
              ...initialValues,
              ...values,
            },
          });

          const data = response?.data ?? {};

          form.setFieldsValue(data);
          onFinish?.(data);

          setSubmitDisabled(true);
          defaultSuccessHandler(t("message.success"));
        } catch (error) {
          defaultErrorHandler({
            error,
            defaultErrorMessage: t("message.error"),
          });
        } finally {
          setSubmitLoading(false);
        }
      }
    },
    [initialValues, onFinish, xhrMethod, form, t, url]
  );

  if (!initialValues) {
    return (
      <FormWrapper name={formName}>
        <div style={{ height: "150px" }} />
      </FormWrapper>
    );
  }

  return (
    <FormWrapper name={formName}>
      <Form
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
        layout="vertical"
        name={formName}
        form={form}
        initialValues={initialValues}
      >
        <Row gutter={GUTTER_FULL_WIDTH.HORIZONTAL}>
          <FormContext.Provider value={{ name: formName, form }}>
            {tab?.fields?.map((field) => (
              <ComponentPermissionsChecker
                key={field.fieldCode}
                hasRight={initialValues?.isOwner?.UPDATE}
                availablePermissions={field.permissions}
                mode="readonly"
              >
                {createFormField(field)}
              </ComponentPermissionsChecker>
            ))}
          </FormContext.Provider>
        </Row>
        <ComponentPermissionsChecker hasRight={initialValues?.isOwner?.UPDATE}>
          <FormFooter
            style={{ marginTop: "16px", marginBottom: 0 }}
            loading={submitLoading}
            disabled={submitDisabled}
            onCancel={handleGoBack}
            withCancel={withCancel}
          />
        </ComponentPermissionsChecker>
      </Form>
    </FormWrapper>
  );
};

export default FieldsContainer;
