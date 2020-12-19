import { conformToMask } from "react-text-mask";
import {
  PHONE_TRIM_START_CHARS,
  BASE_PHONE_LENGTH,
  PHONE_MASK,
  PHONE_MASK_WITH_CODE,
} from "../constants";

export const getNormalizePhone = (value: string) =>
  value?.replace(/[^\d\+]/g, "") ?? "";

export const isNeedReplaceFirstChar = (phone: string) =>
  PHONE_TRIM_START_CHARS.includes(phone[0]) &&
  phone.length === BASE_PHONE_LENGTH;

export const getMask = (value: string) => {
  const normalizeValue = getNormalizePhone(value);
  const withoutCode = normalizeValue.length <= BASE_PHONE_LENGTH;
  return withoutCode ? PHONE_MASK : PHONE_MASK_WITH_CODE;
};

export const getConformedValue = (value: string) => {
  const mask = getMask(value);
  return conformToMask(value, mask, { guide: false })?.conformedValue ?? "";
};
