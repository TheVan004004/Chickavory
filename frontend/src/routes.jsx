import * as React from "react";
import { useRoutes } from "react-router";
import App from "./App";
import Home from "./pages/Home";
import News from "./pages/News";
import User from "./pages/User";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import ManageProducts from "./components/admin/ManageProducts";
import ManageOrders from "./components/admin/ManageOrders";
import Delivery from "./pages/Delivery";

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
          path: "delivery",
          element: <Delivery />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "admin",
          element: <Admin />,
          children: [
            {
              index: true,
              element: <ManageProducts />,
            },
            {
              path: "orders",
              element: <ManageOrders />,
            },
          ],
        },
      ],
    },
  ]);
}
