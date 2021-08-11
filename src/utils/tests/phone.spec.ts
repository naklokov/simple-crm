import {
  getConformedValue,
  getNormalizePhone,
  isNeedReplaceFirstChar,
} from "../phone";

const phoneBase = "+79998887766";

const phoneWithCode = `${phoneBase},22`;

test("getConformedValue", () => {
  expect(getConformedValue("+7999")).toBe("+7 (999) ");
  expect(getConformedValue("8999")).toBe("+7 (999) ");
  expect(getConformedValue(phoneBase)).toBe("+7 (999) 888-77-66");
  expect(getConformedValue(phoneWithCode)).toBe("+7 (999) 888-77-66, 22");
  expect(getConformedValue(`${phoneBase},`)).toBe("+7 (999) 888-77-66");
  expect(getConformedValue(`${phoneBase}, `)).toBe("+7 (999) 888-77-66");
});

test("isNeedReplaceFirstChar", () => {
  expect(isNeedReplaceFirstChar("7911")).toBe(true);
  expect(isNeedReplaceFirstChar("8911")).toBe(true);
  expect(isNeedReplaceFirstChar("+7911")).toBe(false);
  expect(isNeedReplaceFirstChar("")).toBe(false);
});

test("getNormalizePhone", () => {
  expect(getNormalizePhone("+7 (911) 222-33-44")).toBe("+79112223344");
  expect(getNormalizePhone("+7 (911) 222-33-44, 1")).toBe("+79112223344,1");
  expect(getNormalizePhone("+7 (911) 222-33-44, 11111")).toBe(
    "+79112223344,11111"
  );
  expect(getNormalizePhone("+7 (911) 222")).toBe("+7911222");
});
