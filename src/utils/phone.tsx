import { conformToMask } from "react-text-mask";
import { trimEnd, values } from "lodash";
import {
  PHONE_TRIM_START_CHARS,
  PHONE_MASK,
  ADDITIONAL_CODE_PREFIX,
  RU_PHONE_CODE,
  NORMALIZE_PHONE_LENGTH,
} from "../constants";

// +79998887766
export const getNormalizePhone = (value: string) =>
  value?.replace(/[^+,\d]/g, "") ?? "";

export const isNeedReplaceFirstChar = (phone: string) =>
  PHONE_TRIM_START_CHARS.includes(phone[0]);

/**
 * Получение номера телефона с замененым кодом страны если он начинается с 7 или 8 на +7
 * @param value номер телефона без маски (Пример: 89106359851)
 * @param config конфиг
 */
export const getConformedValue = (
  value: string,
  config: any = { guide: false }
) => {
  if (value) {
    const phone = isNeedReplaceFirstChar(value)
      ? RU_PHONE_CODE + value.substring(1)
      : value;

    const { conformedValue } = conformToMask(phone, PHONE_MASK, config);

    return phone.length >= NORMALIZE_PHONE_LENGTH
      ? trimEnd(conformedValue, ADDITIONAL_CODE_PREFIX)
      : conformedValue;
  }

  return "";
};
