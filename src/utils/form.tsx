import React from "react";
import { fields } from "../components";
import { FormFieldProps, TEXT_FORMATS } from "../constants";
import mapValues from "lodash/mapValues";

const { Text, TextArea, DateTime, Dictionary } = fields;

export const convertInitialValues = (values: Object) =>
  mapValues(values, (field: FormFieldProps) => {
    if (field.type == "date") {
      return;
    }
  });

export const createFormField = (field: FormFieldProps) => {
  switch (field.type) {
    case "string":
      if (field.format === TEXT_FORMATS.TEXT_AREA)
        return <TextArea {...field} />;

      return <Text {...field} />;
    case "date":
      return <DateTime {...field} />;
    case "dictionary":
      return <Dictionary {...field} />;
    default:
      return null;
  }
};
