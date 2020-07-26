import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import ForgorPassword from "../forgot-password";

const mockStore = configureStore([]);

test("render correct", () => {
  const component = renderer.create(
    <Provider store={mockStore({})}>
      <ForgorPassword />
    </Provider>
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
