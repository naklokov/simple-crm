import React from "react";
import axios from "axios";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import { mount } from "enzyme";

import { Button } from "antd";
import { Login } from "..";
import { urls } from "../../../constants";
import { logger } from "../../../utils";
import * as utils from "../utils";
import Cookie from "js-cookie";

const mock = new MockAdapter(axios);

const error = {
  errorCode: "OLVE-6",
  errorDescription: "Неверный логин или пароль",
  errorMessage: "Bad credentials",
};

const username = "test@mail.ru";

jest.mock("../../../utils");

test("render correct", () => {
  const component = renderer.create(<Login />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

xtest("authentication failed", () => {
  mock.onPost(urls.login.submit).reply(400, error);

  const loggerErrorSpy = jest.spyOn(logger, "error");

  const wrapper = mount(<Login />);
  wrapper
    .find(".ant-input#loginForm_username")
    .simulate("change", { target: { value: username } });

  wrapper
    .find("#loginForm_password.ant-input")
    .simulate("change", { target: { value: "12345678" } });

  wrapper.find(Button).simulate("submit");

  expect(loggerErrorSpy).toHaveBeenCalledWith({
    username,
    value: error.errorCode,
    message: error.errorDescription,
  });
});

xtest("authentication successfull", () => {
  mock.onPost(urls.login.submit, {}).reply(200, {});
  Cookie.set("username", username);
  Cookie.set("rememberMe", "true");

  const loggerInfoSpy = jest.spyOn(logger, "info");
  const storeRememberMeParamsSpy = jest.spyOn(utils, "storeRememberMeParams");

  const wrapper = mount(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  wrapper
    .find(".ant-input#loginForm_username")
    .simulate("change", { target: { value: username } });

  wrapper
    .find("#loginForm_password.ant-input")
    .simulate("change", { target: { value: "12345678" } });

  wrapper.find(Button).simulate("submit");

  expect(storeRememberMeParamsSpy).toHaveBeenCalled();
  expect(loggerInfoSpy).toHaveBeenCalledWith({
    message: "authentication.successfull",
    username,
  });
});
