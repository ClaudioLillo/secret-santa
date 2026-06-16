import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createHashRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import './index.css';
// components
import Login from "./components/login/Login";
// import Devices from "./components/devices/Devices";
import Tasks from "./components/tasks/Tasks";
import Books from "./components/books/Books";
import Recipes from "./components/recipes/Recipes";
import Navigator from "./components/navigator/Navigator";
import Supermarket from "./components/supermarket/Supermarket";
import Plants from "./components/plants/Plants";

let user: string | undefined = undefined;

const token = localStorage.getItem("token");

if (token === null || token === "") {
  user = "";
} else {
  const decoded = jwtDecode<{ exp: number; user: string }>(token);
  const now = new Date().getTime();
  if (decoded?.exp * 1000 > now) {
    user = decoded?.user;
  } else {
    user = "";
  }
}

const withNavigator = (component?: ReactNode) => {
  return (
    <div className="app">
      <Navigator user={user}/>
      {component && component}
    </div>
  )
}

const router = createHashRouter([
  {
    path: "/*",
    element: withNavigator(),
  },
  {
    path: "/tasks",
    element: withNavigator(<Tasks/>),
  },
  {
    path: "/books",
    element: withNavigator(<Books />),
  },
  {
    path: "/recipes",
    element: withNavigator(<Recipes />),
  },
  {
    path: "/supermarket",
    element: withNavigator(<Supermarket />),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/plants",
    element: <Plants />,
  },
]);

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        {user !== undefined && (
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        )}
      </QueryClientProvider>
    </React.StrictMode>
  );
}
