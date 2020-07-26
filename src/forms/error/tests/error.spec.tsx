import React from "react";
import renderer from "react-test-renderer";
import { Error } from "../error";

const message = "Ошибочка";
xtest("render correct 500", () => {
  const component = renderer.create(<Error />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

xtest("render correct 400", () => {
  jest.mock("react-router", () => ({
    useParams: jest.fn().mockReturnValue({ id: "" }),
  }));
  const component = renderer.create(<Error />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

xtest("render correct 404", () => {
  const component = renderer.create(<Error />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
