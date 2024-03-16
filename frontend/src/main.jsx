import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.scss";

import { Provider } from "react-redux";
import { store } from "./store";
import AppRoutes from "./AppRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);
