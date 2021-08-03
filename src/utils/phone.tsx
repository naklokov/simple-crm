import { conformToMask } from "react-text-mask";
import {
  CHECK_PHONE_MASKS,
  NORMALIZE_PHONE_LENGTH,
  PHONE_MASK,
  PHONE_MASK_WITH_CODE,
  PHONE_TRIM_START_CHARS,
  RU_PHONE_CODE,
} from "../constants";

// +79998887766
export const getNormalizePhone = (value: string) =>
  value?.replace(/[^+,\d]/g, "") ?? "";

export const isNeedReplaceFirstChar = (phone: string) =>
  PHONE_TRIM_START_CHARS.includes(phone?.[0]);

export const getMask = (value: string) => {
  const normalizeValue = getNormalizePhone(value);
  const withoutCode = normalizeValue.length <= NORMALIZE_PHONE_LENGTH;
  return withoutCode ? PHONE_MASK : PHONE_MASK_WITH_CODE;
};

export const getConformedValue = (value: string) => {
  const mask = getMask(value);
  return phoneReplaceCountryCode(value, mask, { guide: false });
};

export const isPhone = (phone: string) =>
  CHECK_PHONE_MASKS.some((value) => phone.match(value));

export const phoneReplaceCountryCode = (
  value: string,
  mask: (string | RegExp)[],
  config = {}
) =>
  isNeedReplaceFirstChar(value)
    ? conformToMask(RU_PHONE_CODE + value.substring(1), mask, config)
        .conformedValue
    : conformToMask(value, mask, config)?.conformedValue;
