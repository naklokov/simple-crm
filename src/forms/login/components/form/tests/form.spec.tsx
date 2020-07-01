import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import renderer from "react-test-renderer";

import { message } from "antd";

import { Form } from "..";
import { urls } from "../../../../../constants";

const mock = new MockAdapter(axios);
const errorMessage = "Ошибка";

describe("Login Form", () => {
  it("render correct", () => {
    const component = renderer.create(<Form />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("send finish with bad credentials", () => {
    const component = renderer.create(<Form />);
    const instance = component.root;

    const errorSpy = jest.spyOn(console, "error");
    const messageErrorSpy = jest.spyOn(message, "error");

    mock.onGet(urls.login.submit).reply(500, {
      message: "ошибка",
    });

    instance.props.onFinish({
      username: "test@mail.ru",
      password: "123",
      rememberMe: false,
    });

    expect(errorSpy).toHaveBeenCalledWith("ошибка", "test@mail.ru");
  });
});
