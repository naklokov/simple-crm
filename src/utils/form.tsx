import React from "react";
import { fields } from "../components";
import { FieldProps } from "../constants";
import isEqual from "lodash/isEqual";
import some from "lodash/some";
import { FormInstance } from "antd/lib/form";

interface EntityWithId {
  [key: string]: any;
  id: string;
}

const { Text, TextArea, DateTime, Dictionary, Phone, Entity } = fields;

export const isValuesChanged = (
  prev: { [key: string]: any },
  next: { [key: string]: any }
): boolean => {
  const keys = Object.keys(next);
  return some(keys, (key) => !isEqual(prev[key], next[key]));
};

export const createFormField = (
  field: FieldProps,
  form: FormInstance
): JSX.Element => {
  switch (field.type) {
    case "string":
      if (field.format === "textarea") {
        return <TextArea {...field} form={form} />;
      }

      return <Text {...field} form={form} />;
    case "phone":
      return <Phone {...field} form={form} />;
    case "date":
      return <DateTime {...field} form={form} />;
    case "dictionary":
      return <Dictionary {...field} form={form} />;
    case "entity":
      return <Entity {...field} form={form} />;
    default:
      return <div />;
  }
};

export const getUpdatedEntityArray = <T extends EntityWithId>(
  entity: T,
  array: T[],
  key: string = "id"
) =>
  array?.map((item) =>
    Object.assign({}, item[key] === entity[key] ? entity : item)
  ) ?? [];

export const getFiteredEntityArray = (id: string, array: any[]) =>
  array.filter((o) => o.id !== id);
