import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { App } from "./app";

import "antd/dist/antd.css";

import "./i18n";
import "moment/locale/ru";

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
