import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Formio} from '@formio/react';
import Premium from '@formio/premium';
import './index.scss';

Formio.use(Premium);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/data-table-demo/'>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
