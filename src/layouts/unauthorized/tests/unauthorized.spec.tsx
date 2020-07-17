import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import { UnauthorizedLayout } from "..";

test("render correct", () => {
  const component = renderer.create(
    <UnauthorizedLayout title="Заголовок" description="Описание">
      <div />
    </UnauthorizedLayout>
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test("render title optionally", () => {
  const wrapper = shallow(
    <UnauthorizedLayout title="Заголовок">
      <div />
    </UnauthorizedLayout>
  );

  expect(wrapper.find(".title").length).toBe(1);

  const wrapperWithoutTitle = shallow(
    <UnauthorizedLayout>
      <div />
    </UnauthorizedLayout>
  );

  expect(wrapperWithoutTitle.find(".title").length).toBe(0);
});

test("render description optionally", () => {
  const wrapper = shallow(
    <UnauthorizedLayout description="Описание">
      <div />
    </UnauthorizedLayout>
  );

  expect(wrapper.find(".description").length).toBe(1);

  const wrapperWithoutTitle = shallow(
    <UnauthorizedLayout>
      <div />
    </UnauthorizedLayout>
  );

  expect(wrapperWithoutTitle.find(".description").length).toBe(0);
});
