import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createHashRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import {jwtDecode} from 'jwt-decode';

// components
import Login from "./components/login/Login";
// import Devices from "./components/devices/Devices";
import Tasks from "./components/tasks/Tasks";
import Books from "./components/books/Books";
import Recipes from "./components/recipes/Recipes";
import Home from "./components/home/Home";
import Supermarket from "./components/supermarket/Supermarket";
import Plants from "./components/plants/Plants";

let user: string | undefined = undefined;

const token = localStorage.getItem('token');

if (token === null || token === ""){
  user = "";
} else {
  const decoded = jwtDecode<{exp: number, user: string}>(token);
  const now = new Date().getTime();
  if ( decoded?.exp * 1000 > now){
    user = decoded?.user;
  } else {
    user = ""
  }
}

const router = createHashRouter([
  {
    path: "/*",
    element: <Home user={user}/>,
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
      {user !== undefined && <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>}
    </React.StrictMode>
  );
}
