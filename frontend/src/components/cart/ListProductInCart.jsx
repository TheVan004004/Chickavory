import React, { useEffect, useState } from "react";
import ProductInCart from "../product/ProductInCart";
import useMainContext from "../../hooks/useMainContext";
import { getProductsInCartAPI } from "../../services/cart.api";

export default function ListProductInCart({ setListOrder }) {
  const { user } = useMainContext();
  const [listProductInCart, setListProductInCart] = useState([]);
  useEffect(() => {
    getProductsInCart();
  }, []);
  const getProductsInCart = async () => {
    const res = await getProductsInCartAPI(user.id);
    setListProductInCart(res.data);
  };

  return (
    <div className=" w-full h-auto p-4 shadow-md shadow-red-500/40 rounded-xl overflow-y-auto">
      <div className="flex flex-col gap-4">
        {listProductInCart.map((product, index) => {
          return (
            <ProductInCart
              index={index}
              product={product}
              key={product.id}
              setListOrder={setListOrder}
              setListProductInCart={setListProductInCart}
              getProductsInCart={getProductsInCart}
            />
          );
        })}
      </div>
    </div>
  );
}
