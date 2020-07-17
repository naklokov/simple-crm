const message = "Сообщение";
const value = 1;
const username = "test@mail.ru";

import { getFullMessage, error, debug, warn, HEADERS } from "../remote-logger";
import axios from "axios";
import { urls } from "../../constants";

test("test getFullMessage", () => {
  expect(getFullMessage({ message })).toBe(message);
  expect(getFullMessage({ message, value })).toBe(`${message} ${value}`);
  expect(getFullMessage({ message, value, username })).toBe(
    `${message} ${value} (${username})`
  );
});

test("test error", () => {
  const postSpy = jest.spyOn(axios, "post");
  error({ message });
  expect(postSpy).toHaveBeenCalledWith(
    urls.log.base,
    { message, logLevel: "ERROR" },
    { headers: HEADERS }
  );
});

test("test warn", () => {
  const postSpy = jest.spyOn(axios, "post");
  warn({ message });
  expect(postSpy).toHaveBeenCalledWith(
    urls.log.base,
    { message, logLevel: "WARNING" },
    { headers: HEADERS }
  );
});

test("test debug", () => {
  const postSpy = jest.spyOn(axios, "post");
  debug({ message });
  expect(postSpy).toHaveBeenCalledWith(
    urls.log.base,
    { message, logLevel: "DEBUG" },
    { headers: HEADERS }
  );
});
