import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import _ from "lodash";

import "./i18n";
import "antd/dist/antd.css";
import "moment/locale/ru";

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
