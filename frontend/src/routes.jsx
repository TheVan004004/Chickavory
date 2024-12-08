import * as React from "react";
import { useRoutes } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import News from "./pages/News";
import User from "./pages/User";
import Cart from "./pages/Cart";

export default function RoutesApp() {
  return useRoutes([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "user",
          element: <User />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ]);
}
