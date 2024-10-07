import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createHashRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

// components
import Login from "./components/login/Login";
import Devices from "./components/devices/Devices";
import Tasks from "./components/tasks/Tasks";
import Books from "./components/books/Books";

const router = createHashRouter([
  {
    path: "/*",
    element: <Devices />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
  },
  {
    path: "/books",
    element: <Books />,
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
