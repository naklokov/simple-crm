export const PHONE_TRIM_START_CHARS = ["7", "8"];

export const BASE_PHONE_LENGTH = 12;

export const PHONE_MASK = [
  "+",
  "7",
  " ",
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

export const PHONE_MASK_WITH_CODE = [...PHONE_MASK, ",", " ", /\d/, /\d/, /\d/];

export const PHONE_PLACEHOLDER = "+7 ";
