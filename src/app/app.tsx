import React from "react";
import axios from "axios";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { ConfigProvider, message } from "antd";
import ruRu from "antd/es/locale/ru_RU";
import { Routes } from "./routes";
import { reducers } from "../__data__";
import { errorsInterceptor } from "./interceptors";
import { storage, checkMobile } from "../utils";

import { ErrorBoundary } from "../wrappers";

declare global {
  interface Window {
    isMobile: boolean;
  }
}

message.config({
  maxCount: 1,
});

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
  errorsInterceptor(store.dispatch, store.getState()?.app?.error ?? {})
);

window.isMobile = checkMobile();

const App = () => (
  <ConfigProvider locale={ruRu} >
    <Provider store={store}>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </Provider>
  </ConfigProvider>
);

export default App;
