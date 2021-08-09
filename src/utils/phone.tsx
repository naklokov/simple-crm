import { conformToMask } from "react-text-mask";
import { PHONE_TRIM_START_CHARS, PHONE_MASK } from "../constants";

// +79998887766
export const getNormalizePhone = (value: string) =>
  value?.replace(/[^+,\d]/g, "") ?? "";

export const isNeedReplaceFirstChar = (phone: string) =>
  PHONE_TRIM_START_CHARS.includes(phone[0]);

export const getConformedValue = (value: string) =>
  conformToMask(value, PHONE_MASK, { guide: false })?.conformedValue ?? "";
