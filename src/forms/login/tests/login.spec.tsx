import React from "react";
import axios from "axios";
import renderer from "react-test-renderer";
import MockAdapter from "axios-mock-adapter";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";

import { Button } from "antd";
import { Login } from "../login";
import { urls } from "../../../constants";
import * as logger from "../../../utils/remote-logger";

import Cookie from "js-cookie";
import { Provider } from "react-redux";
import { FORM_NAME, FIELDS } from "../constants";

const mock = new MockAdapter(axios);
const mockStore = configureStore([]);
const store = mockStore({
  persist: {
    loading: false,
    auth: true,
    permissions: [],
  },
});

const error = {
  errorCode: "OLVE-6",
  errorDescription: "Неверный логин или пароль",
  errorMessage: "Bad credentials",
};

const username = "test@mail.ru";

test("render correct", () => {
  const component = renderer.create(
    <Provider store={store}>
      <Login setAuthentication={jest.fn()} />
    </Provider>
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

xtest("authentication successfull", async () => {
  const setAuthSpy = jest.fn();

  mock.onPost(urls.login.submit).reply(200, {});
  Cookie.set("username", username);
  Cookie.set("rememberMe", "true");

  const wrapper = mount(
    <Provider store={store}>
      <Login setAuthentication={setAuthSpy} />
    </Provider>
  );
  wrapper
    .find(`.ant-input#${FORM_NAME}_${FIELDS.USERNAME}`)
    .simulate("change", { target: { value: username } });
  wrapper
    .find(`.ant-input#${FORM_NAME}_${FIELDS.PASSWORD}`)
    .simulate("change", { target: { value: "12345678" } });
  wrapper.find(Button).simulate("submit");

  await expect(setAuthSpy).toHaveBeenCalledWith(true);
});
