import React from "react";
import { fields } from "../components";
import { FormFieldProps, TEXT_FORMATS } from "../constants";
import isEqual from "lodash/isEqual";
import some from "lodash/some";

const { Text, TextArea, DateTime, Dictionary } = fields;

export const isValuesChanged = (
  prev: { [key: string]: any },
  next: { [key: string]: any }
): boolean => {
  const keys = Object.keys(next);
  return some(keys, (key) => !isEqual(prev[key], next[key]));
};

export const createFormField = (field: FormFieldProps): JSX.Element => {
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
      return <div />;
  }
};
