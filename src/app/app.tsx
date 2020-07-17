import React from "react";
import axios from "axios";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { Routes } from "./routes";
import { reducers } from "../__data__";
import { errorsInterceptor } from "./interceptors";
import { storage } from "../utils";
import { Loader } from "../components";

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
  errorsInterceptor(store.dispatch)
);

const loading = store.getState()?.persist?.loading ?? false;

const App = () => (
  <Provider store={store}>
    {loading && <Loader />}
    <Routes />
  </Provider>
);

export default App;
