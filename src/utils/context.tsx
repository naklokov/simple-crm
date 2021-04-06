import React from "react";
import { ClientEntityProps } from "../constants";

export const FormContext = React.createContext<any>("");

export const ClientsPersonalContext = React.createContext<ClientEntityProps[]>(
  []
);
