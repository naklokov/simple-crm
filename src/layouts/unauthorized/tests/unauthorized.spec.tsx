import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import { Unauthorized as UnauthorizedLayout } from "../unauthorized";

test("render correct", () => {
  const component = renderer.create(
    <UnauthorizedLayout
      loading={false}
      title="Заголовок"
      description="Описание"
    >
      <div />
    </UnauthorizedLayout>
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test("render title optionally", () => {
  const wrapper = shallow(
    <UnauthorizedLayout loading={false} title="Заголовок">
      <div />
    </UnauthorizedLayout>
  );

  expect(wrapper.find(".title").length).toBe(1);

  const wrapperWithoutTitle = shallow(
    <UnauthorizedLayout loading={false}>
      <div />
    </UnauthorizedLayout>
  );

  expect(wrapperWithoutTitle.find(".title").length).toBe(0);
});

test("render description optionally", () => {
  const wrapper = shallow(
    <UnauthorizedLayout loading={false} description="Описание">
      <div />
    </UnauthorizedLayout>
  );

  expect(wrapper.find(".description").length).toBe(1);

  const wrapperWithoutTitle = shallow(
    <UnauthorizedLayout loading={false}>
      <div />
    </UnauthorizedLayout>
  );

  expect(wrapperWithoutTitle.find(".description").length).toBe(0);
});
