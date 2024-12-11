import React, { useState } from "react";
import ListProduct from "../components/cart/ListProductInCart";
import Payment from "../components/cart/Payment";
import useMainContext from "../hooks/useMainContext";
import NotAuth from "./NotAuth";

export default function Cart() {
  const { user } = useMainContext();
  const [listOrder, setListOrder] = useState([]);
  return (
    <>
      {user ? (
        <div className="p-4 pt-20 h-[calc(100vh-5rem)] max-md:h-auto grid grid-cols-2 max-md:grid-cols-1 gap-8">
          <ListProduct setListOrder={setListOrder} />
          <Payment listOrder={listOrder} setListOrder={setListOrder} />
        </div>
      ) : (
        <NotAuth />
      )}
    </>
  );
}
