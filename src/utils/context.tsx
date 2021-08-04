import { FormInstance } from "antd";
import React from "react";
import { ClientEntityProps } from "../constants";

interface FormContextProps {
  name?: string;
  form?: FormInstance;
}

export const FormContext = React.createContext<FormContextProps>({
  form: undefined,
  name: undefined,
});

export const ClientsPersonalContext = React.createContext<ClientEntityProps[]>(
  []
);
