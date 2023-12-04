import React from "react";
import ReactDOM from "react-dom/client";

import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

// components
import App from "./App";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

const router = createHashRouter([
  {
    path: "/*",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
