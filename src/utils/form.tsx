import React from "react";
import { fields } from "../components";
import { FieldProps } from "../constants";
import isEqual from "lodash/isEqual";
import some from "lodash/some";
import { getNormalizePhone } from "./phone";

interface EntityWithId {
  [key: string]: any;
  id: string;
}

const {
  Text,
  TextArea,
  DateTime,
  Dictionary,
  Phone,
  Entity,
  Email,
  Href,
  EntityPersonal,
} = fields;

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
      if (field.format === "textarea") {
        return <TextArea {...field} />;
      }

      return <Text {...field} />;
    case "href":
      return <Href {...field} />;
    case "email":
      return <Email {...field} />;
    case "phone":
      return <Phone {...field} />;
    case "date":
      return <DateTime {...field} />;
    case "dictionary":
      return <Dictionary {...field} />;
    case "entity":
      return <Entity {...field} />;
    case "entity-personal":
      return <EntityPersonal {...field} />;
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

export const vatRule = {
  validator: (_: any, value: string) => {
    // может быть пустым
    if (!value) {
      return Promise.resolve();
    }

    if (checkINN(value)) {
      return Promise.resolve();
    }

    return Promise.reject("Некорректный формат ИНН");
  },
};

export const phoneRule = {
  validator: (_: any, value: string) => {
    // может быть пустым
    if (!value) {
      return Promise.resolve();
    }

    if (checkPhone(value)) {
      return Promise.resolve();
    }

    return Promise.reject("Некорректный формат телефона");
  },
};

export const checkPhone = (value: string) => {
  const normalizePhone = getNormalizePhone(value);
  return normalizePhone.length > 11;
};

export const checkINN = (value: any) => {
  if (value.match(/\D/)) return false;

  var inn = value.match(/(\d)/g);

  if (inn.length === 10) {
    return (
      inn[9] ===
      String(
        ((2 * inn[0] +
          4 * inn[1] +
          10 * inn[2] +
          3 * inn[3] +
          5 * inn[4] +
          9 * inn[5] +
          4 * inn[6] +
          6 * inn[7] +
          8 * inn[8]) %
          11) %
          10
      )
    );
  } else if (inn.length === 12) {
    return (
      inn[10] ===
        String(
          ((7 * inn[0] +
            2 * inn[1] +
            4 * inn[2] +
            10 * inn[3] +
            3 * inn[4] +
            5 * inn[5] +
            9 * inn[6] +
            4 * inn[7] +
            6 * inn[8] +
            8 * inn[9]) %
            11) %
            10
        ) &&
      inn[11] ===
        String(
          ((3 * inn[0] +
            7 * inn[1] +
            2 * inn[2] +
            4 * inn[3] +
            10 * inn[4] +
            3 * inn[5] +
            5 * inn[6] +
            9 * inn[7] +
            4 * inn[8] +
            6 * inn[9] +
            8 * inn[10]) %
            11) %
            10
        )
    );
  }

  return false;
};

export const checkEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
