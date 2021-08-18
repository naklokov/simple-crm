import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { App } from "./app";

import "./i18n";
import "moment/locale/ru";
import "./assets/styles/_jivo.scss";

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
