import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { Login } from "../login";

const mockStore = configureStore([]);
const store = mockStore({
  persist: {
    loading: false,
    auth: true,
    permissions: [],
  },
});

test("render correct", () => {
  const component = renderer.create(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
