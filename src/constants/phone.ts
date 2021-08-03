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
];

export const PHONE_MASK_WITH_CODE = [
  ...PHONE_MASK,
  ",",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const CHECK_PHONE_MASKS = [
  /^(\+7|7|8) \(\d{3}\) \d{3}-\d{2}-\d{2}((, |,)\d{1,5})?$/,
  /^(\+7|7|8)\d{1,10}(,?\d{0,5})?$/,
];

export const PHONE_PLACEHOLDER = `${RU_PHONE_CODE} `;
