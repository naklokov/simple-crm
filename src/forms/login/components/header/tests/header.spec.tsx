import React from "react";
import renderer from "react-test-renderer";

import { Header } from "..";

describe("Login Header", () => {
  it("render correct", () => {
    const component = renderer.create(<Header />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("");
});
