import React from "react";
import { fields } from "../components";
import { FormFieldProps } from "../constants";

const FORMATS = {
  TEXTAREA: "textarea",
};

const { Text, TextArea } = fields;

export const createFormField = (field: FormFieldProps) => {
  switch (field.type) {
    case "string":
      if (field.format === FORMATS.TEXTAREA) return <TextArea {...field} />;

      return <Text {...field} />;
    default:
      return null;
  }
};
