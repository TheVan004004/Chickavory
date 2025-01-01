import React, { useState } from "react";
import useMainContext from "../hooks/useMainContext";
import NotAuth from "./NotAuth";
import ListOrder from "../components/order/ListOrder";

export default function Order() {
  const { user } = useMainContext();
  return (
    <>
      {user ? (
        <div className=" min-h-[calc(100vh-5rem)] max-md:min-h-[calc(100vh-8rem)] p-4 pt-20 max-md:h-auto ">
          <ListOrder user={user} />
        </div>
      ) : (
        <NotAuth />
      )}
    </>
  );
}
