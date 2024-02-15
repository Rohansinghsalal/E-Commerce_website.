import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
// import "antd/dist/reset.css";

import store from "./redux/store.js";
import { Provider } from "react-redux";
import { SearchProvider } from "./context/search.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <SearchProvider>
      <App />
    </SearchProvider>
  </Provider>,
  // </React.StrictMode>,
);
