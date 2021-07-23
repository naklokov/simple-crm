import {
  checkEmail,
  checkINN,
  isValuesChanged,
  ogrnRule,
  phoneRule,
  validateOgrn,
} from "../form";

const prev = {
  id: 1,
  value: "test",
  method: {
    ui: 123,
  },
};

test("isValuesChanged", () => {
  const next = {
    ...prev,
    id: 2,
    value: "test1",
  };

  const moreProps = {
    ...prev,
    lolo: 1231,
    test: "ddd",
  };

  expect(isValuesChanged(prev, prev)).toBe(false);
  expect(isValuesChanged(prev, moreProps)).toBe(true);
  expect(isValuesChanged(prev, next)).toBe(true);
});

test("ogrnRule", () => {
  expect(ogrnRule.validator("", "")).resolves.toEqual(undefined);
  expect(ogrnRule.validator("", "1053600591197")).resolves.toEqual(undefined);
  expect(ogrnRule.validator("", "+79106522255")).resolves.toEqual(undefined);
  expect(ogrnRule.validator("", "8916522255")).rejects.toEqual(
    new Error("Некорректный формат телефона")
  );
});

test("phoneRule", () => {
  expect(phoneRule.validator("", "")).resolves.toEqual(undefined);
  expect(phoneRule.validator("", "+7 (910) 652-22-55")).resolves.toEqual(
    undefined
  );
  expect(phoneRule.validator("", "+79106522255")).resolves.toEqual(undefined);
  expect(phoneRule.validator("", "8916522255")).rejects.toEqual(
    new Error("Некорректный формат телефона")
  );
});

test("validateOgrn", () => {
  expect(validateOgrn("22222222d")).toStrictEqual({
    errorMessage: "ОГРН может состоять только из цифр",
    success: false,
  });
  expect(validateOgrn("1234567890123")).toStrictEqual({
    success: false,
    errorMessage: "Некорректный формат ОГРН",
  });
  expect(validateOgrn("")).toStrictEqual({
    success: false,
    errorMessage: "ОГРН пуст",
  });
  expect(validateOgrn("1053600591197")).toStrictEqual({
    success: true,
    errorMessage: "",
  });
});

test("checkINN", () => {
  expect(checkINN("1111111117")).toBe(true);
  expect(checkINN("6234192789")).toBe(true);
  expect(checkINN("1111111116")).toBe(false);
  expect(checkINN("111111111")).toBe(false);
  expect(checkINN("11111111166")).toBe(false);
});

test("checkEmail", () => {
  expect(checkEmail("test@website.ru")).toBe(true);
  expect(checkEmail("website.ru")).toBe(false);
  expect(checkEmail("test@website")).toBe(false);
  expect(checkEmail("website")).toBe(false);
});
