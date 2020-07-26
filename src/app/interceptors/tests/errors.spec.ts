import { errorsInterceptor } from "../errors";
import { setAuth } from "../../../__data__";

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

  expect(dispatchSpy).toHaveBeenCalledWith(setAuth(false));
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
