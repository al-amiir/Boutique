import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Products from "./components/Products";
import Cart from "./mainComponent/Cart";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
