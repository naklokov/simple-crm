import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

import './i18n';
import './assets/styles/_common.css'
import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
