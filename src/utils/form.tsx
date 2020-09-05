import React from "react";
import { fields } from "../components";
import { FieldProps } from "../constants";
import isEqual from "lodash/isEqual";
import some from "lodash/some";

interface EntityWithId {
  id: string;
}

const { Text, TextArea, DateTime, Dictionary, Phone } = fields;

export const isValuesChanged = (
  prev: { [key: string]: any },
  next: { [key: string]: any }
): boolean => {
  const keys = Object.keys(next);
  return some(keys, (key) => !isEqual(prev[key], next[key]));
};

export const createFormField = (field: FieldProps): JSX.Element => {
  switch (field.type) {
    case "string":
      if (field.format === "textarea") return <TextArea {...field} />;

      return <Text {...field} />;
    case "phone":
      return <Phone {...field} />;
    case "date":
      return <DateTime {...field} />;
    case "dictionary":
      return <Dictionary {...field} />;
    default:
      return <div />;
  }
};

export const getUpdatedEntityArray = <T extends EntityWithId>(
  entity: T,
  array: T[]
) => array?.map((item) => (item.id === entity.id ? entity : item)) ?? [];
