import React from "react";
import { fields } from "../components";
import { FormFieldProps } from "../constants";
import mapValues from "lodash/mapValues";

const FORMATS = {
  TEXTAREA: "textarea",
};

const { Text, TextArea, DateTime } = fields;

export const convertInitialValues = (values: Object) =>
  mapValues(values, (field: FormFieldProps) => {
    if (field.type == "date") {
      return;
    }
  });

export const createFormField = (field: FormFieldProps) => {
  switch (field.type) {
    case "string":
      if (field.format === FORMATS.TEXTAREA) return <TextArea {...field} />;

    case "date":
      return <DateTime {...field} />;
    default:
      return null;
  }
};
