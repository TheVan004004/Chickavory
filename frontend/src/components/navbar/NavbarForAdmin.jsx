import React from "react";
import {
  HiOutlineChartSquareBar,
  HiOutlineClipboardList,
  HiOutlineCollection,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function NavbarForAdmin() {
  return (
    <div className="flex justify-left items-center gap-8">
      <Link
        to="/admin"
        className="flex justify-center items-center gap-2 cursor-pointer"
      >
        <HiOutlineChartSquareBar className="size-6" />
        <p className="text-lg">Overview</p>
      </Link>
      <Link
        to="products"
        className="flex justify-center items-center gap-2 cursor-pointer"
      >
        <HiOutlineCollection className="size-6" />
        <p className="text-lg">Products</p>
      </Link>
      <Link
        to="orders"
        className="flex justify-center items-center gap-2 cursor-pointer"
      >
        <HiOutlineClipboardList className="size-6" />
        <p className="text-lg">Orders</p>
      </Link>
    </div>
  );
}
