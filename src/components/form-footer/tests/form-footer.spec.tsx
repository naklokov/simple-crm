import React from "react";
import renderer from "react-test-renderer";
import { FormFooter } from "..";

test("renders FormFooter snapshot", () => {
  const component = renderer.create(
    <FormFooter disabled={false} loading={false} />
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
