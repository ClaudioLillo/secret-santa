import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createHashRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

// components
import Login from "./components/login/Login";
import Devices from "./components/devices/Devices";

const router = createHashRouter([
  {
    path: "/*",
    element: <Devices />,
  },
  {
    path: "/lists",
    element: <Devices />,
  },
  {
    path: "/books",
    element: <Devices />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
}
