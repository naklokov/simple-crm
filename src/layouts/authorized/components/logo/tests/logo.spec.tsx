import React from "react";
import renderer from "react-test-renderer";

import { Logo } from "..";

test("render correct with collapsed false", () => {
  const component = renderer.create(<Logo collapsed={false} />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test("render correct with collapsed true", () => {
  const component = renderer.create(<Logo collapsed={true} />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
