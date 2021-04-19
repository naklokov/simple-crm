import React from "react";
import { parseInt, isEqual } from "lodash";
import some from "lodash/some";
import { fields } from "../components";
import { FieldProps } from "../constants";
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
  array?.map((item) => ({ ...(item[key] === entity[key] ? entity : item) })) ??
  [];

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

    return Promise.reject(new Error("Некорректный формат ИНН"));
  },
};

export const ogrnRule = {
  validator: (_: any, value: string) => {
    if (!value) {
      return Promise.resolve();
    }

    const { success, errorMessage } = validateOgrn(value);

    if (success) {
      return Promise.resolve();
    }

    return Promise.reject(new Error(errorMessage));
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

    return Promise.reject(new Error("Некорректный формат телефона"));
  },
};

export const checkPhone = (value: string) => {
  const normalizePhone = getNormalizePhone(value);
  return normalizePhone.length > 11;
};

export const validateOgrn = (ogrn: string) => {
  if (!ogrn.length) {
    return {
      success: false,
      errorMessage: "ОГРН пуст",
    };
  }

  if (/[^0-9]/.test(ogrn)) {
    return {
      success: false,
      errorMessage: "ОГРН может состоять только из цифр",
    };
  }

  if (ogrn.length !== 13 && ogrn.length !== 15) {
    return {
      success: false,
      errorMessage: "ОГРН может состоять из 13 или 15 цифр",
    };
  }

  const n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1));
  if (n13 === parseInt(ogrn[12])) {
    return { success: true, errorMessage: "" };
  }

  const n15 = parseInt((parseInt(ogrn.slice(0, -1)) % 13).toString().slice(-1));
  if (n15 === parseInt(ogrn[14])) {
    return { success: true, errorMessage: "" };
  }

  return { success: false, errorMessage: "Некорректный формат ОГРН" };
};

export const checkINN = (value: any) => {
  if (value.match(/\D/)) return false;

  const inn = value.match(/(\d)/g);

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
  }
  if (inn.length === 12) {
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
