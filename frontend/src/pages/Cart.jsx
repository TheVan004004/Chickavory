import React from "react";
import ListProduct from "../components/cart/ListProduct";
import Payment from "../components/cart/Payment";
import useMainContext from "../hooks/useMainContext";
import NotAuth from "./NotAuth";

export default function Cart() {
  const { user } = useMainContext();
  return (
    <>
      {user ? (
        <div className="p-4 pt-20 h-[calc(100vh-5rem)] max-md:h-auto flex gap-4">
          <ListProduct />
          <Payment />
        </div>
      ) : (
        <NotAuth />
      )}
    </>
  );
}
