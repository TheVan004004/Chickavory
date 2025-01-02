import React from "react";
import useMainContext from "../hooks/useMainContext";
import NavbarForAdmin from "../components/navbar/NavbarForAdmin";
import NotAuth from "./NotAuth";
import { Outlet } from "react-router-dom";

export default function Admin() {
  const { user } = useMainContext();
  return (
    <>
      {user?.role === "admin" ? (
        <div className="p-12 pt-24 min-h-[calc(100vh-5rem)] max-md:min-h-[calc(100vh-8rem)] max-md:p-4 flex flex-col gap-4">
          <NavbarForAdmin />
          <div className="w-[30rem] h-[2px] bg-red-600"></div>
          <Outlet />
        </div>
      ) : (
        <NotAuth />
      )}
    </>
  );
}
