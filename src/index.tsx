import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createHashRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

// components
import Login from "./components/login/Login";
// import Devices from "./components/devices/Devices";
import Tasks from "./components/tasks/Tasks";
import Books from "./components/books/Books";
import Recipes from "./components/recipes/Recipes";
import Home from "./components/home/Home";
import Supermarket from "./components/supermarket/Supermarket";
import Plants from "./components/plants/Plants";

const router = createHashRouter([
  {
    path: "/*",
    element: <Home />,
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
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/supermarket",
    element: <Supermarket />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/plants",
    element: <Plants/>,
  }
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
