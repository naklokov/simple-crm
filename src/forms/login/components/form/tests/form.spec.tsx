import React from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import { message } from "antd";

import { Form } from "..";
import { urls } from "../../../../../constants";

const mock = new MockAdapter(axios);
const errorMessage = "Ошибка";
test("render correct", () => {
  const component = renderer.create(<Form />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test("send finish with bad credentials", async () => {
  mock.onGet(urls.login.submit).reply(500, {
    message: "ошибка",
  });

  const wrapper = shallow(<Form />);
  const messageErrorSpy = jest.spyOn(message, "error");

  wrapper
    .find(".password")
    .simulate("change", { target: { value: "12345678" } });
  wrapper
    .find(".username")
    .simulate("change", { target: { value: "test@mail.ru" } });

  wrapper.find(".submitButton").simulate("click");

  // await expect(localStorage.getItem()).toHaveBeenCalled();
});
