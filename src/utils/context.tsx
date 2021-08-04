import React from "react";
import { ClientEntityProps, ValidationStatusType } from "../constants";

interface FormContextProps {
  name?: string;
  form: any;
}

export const FormContext = React.createContext<FormContextProps>({
  form: {},
  name: undefined,
});

export const ClientsPersonalContext = React.createContext<ClientEntityProps[]>(
  []
);
