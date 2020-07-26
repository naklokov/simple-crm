import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import RestorePassword from "../restore-password";

const mockStore = configureStore([]);

test("render correct", () => {
  const component = renderer.create(
    <Provider store={mockStore({})}>
      <RestorePassword />
    </Provider>
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
