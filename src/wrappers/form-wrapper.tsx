import React, { ReactNode, useState } from "react";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { FORM_WRAPPER, State } from "../constants";

interface FormWrapperProps {
  children: React.ReactNode;
  name?: string;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  name = "",
}) => {
  const loading = useSelector(
    (state: State) => state?.form?.formLoading?.[name] ?? false
  );

  return (
    <div className={FORM_WRAPPER}>
      <Spin spinning={loading}>{children}</Spin>
    </div>
  );
};

export default FormWrapper;
