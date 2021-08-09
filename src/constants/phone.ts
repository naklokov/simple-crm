export const PHONE_TRIM_START_CHARS = ["7", "8"];

// +79998887766
export const NORMALIZE_PHONE_LENGTH = 12;

export const RU_PHONE_CODE = "+7";

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
  ",",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const PHONE_PLACEHOLDER = `${RU_PHONE_CODE} `;
