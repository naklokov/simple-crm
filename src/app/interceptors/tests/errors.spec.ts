import Cookie from "js-cookie";
import { errorsInterceptor } from "../errors";
import { COOKIES } from "../../../constants/http";

const getError = (status = 401) => ({
  response: {
    data: {
      errorDescription: "Ошибочка",
    },
    status,
  },
  config: {},
});

test("error interceptors 401", () => {
  const dispatchSpy = jest.fn();
  const replaceSpy = jest.spyOn(location, "replace");

  errorsInterceptor(dispatchSpy)(getError());

  expect(Cookie.get(COOKIES.JSESSIONID)).toBeUndefined();
  expect(Cookie.get(COOKIES.REMEMBER_ME)).toBeUndefined();
  expect(Cookie.get(COOKIES.USERNAME)).toBeUndefined();

  expect(replaceSpy).toHaveBeenLastCalledWith("/");
});

test("error interceptors 403", () => {
  const replaceSpy = jest.spyOn(location, "replace");

  errorsInterceptor(jest.fn())(getError(403));

  expect(replaceSpy).toHaveBeenLastCalledWith("/errors/403");
});

test("error interceptors 500", () => {
  const replaceSpy = jest.spyOn(location, "replace");

  errorsInterceptor(jest.fn())(getError(500));

  expect(replaceSpy).toHaveBeenLastCalledWith("/errors/500");
});
