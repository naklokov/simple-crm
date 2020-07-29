import React from "react";
import renderer from "react-test-renderer";

import { Menu } from "..";
import { shallow } from "enzyme";
import { Link, BrowserRouter } from "react-router-dom";
import { MENU_ITEMS } from "../../../../../constants/layouts";

test("render correct with collapsed false", () => {
  const component = renderer.create(
    <BrowserRouter>
      <Menu collapsed={false} />
    </BrowserRouter>
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test("render correct with collapsed true", () => {
  const component = renderer.create(
    <BrowserRouter>
      <Menu collapsed={true} />
    </BrowserRouter>
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test("correct Links count", () => {
  const wrapper = shallow(<Menu collapsed={false} />);
  expect(wrapper.find(Link).length).toBe(MENU_ITEMS.length);
});
