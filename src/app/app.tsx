import React from "react";
import axios from "axios";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { Routes } from "./routes";
import { reducers } from "../__data__";
import { errorsInterceptor } from "./interceptors";
import { storage } from "../utils";
import { ErrorScreenWrapper } from "../wrappers";
import { ConfigProvider } from "antd";

import ruRu from "antd/es/locale/ru_RU";

const persistedState = storage.loadState();

const store = configureStore({
  reducer: { ...reducers },
  preloadedState: persistedState,
});

store.subscribe(() => {
  storage.saveState({
    persist: store.getState().persist,
  });
});

axios.interceptors.response.use(
  (response) => response,
  errorsInterceptor(store.dispatch, store.getState())
);

const App = () => (
  <ConfigProvider locale={ruRu}>
    <Provider store={store}>
      <ErrorScreenWrapper>
        <Routes />
      </ErrorScreenWrapper>
    </Provider>
  </ConfigProvider>
);

export default App;
