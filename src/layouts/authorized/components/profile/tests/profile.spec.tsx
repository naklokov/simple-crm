import React from "react";
import renderer from "react-test-renderer";
import { Profile } from "..";

test("render correct", () => {
  const component = renderer.create(<Profile />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
