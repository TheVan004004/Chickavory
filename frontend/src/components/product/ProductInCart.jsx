import React from "react";
import {
  HiOutlineMinusCircle,
  HiOutlinePlusCircle,
  HiOutlineShoppingBag,
  HiOutlineXCircle,
} from "react-icons/hi";
import {
  deleteProductInCartAPI,
  updateProductInCartAPI,
} from "../../services/cart.api";
import useMainContext from "../../hooks/useMainContext";
import { toast } from "react-toastify";

export default function ProductInCart({
  index,
  product,
  setListOrder,
  getProductsInCart,
  setListProductInCart,
}) {
  const { user } = useMainContext();
  const deleteProductInCart = async () => {
    const res = await deleteProductInCartAPI({
      user_id: user.id,
      product_id: product.id,
    });
    getProductsInCart();
    toast.success(res.data.messages);
  };
  const updateProduct = async (count) => {
    setListProductInCart((prev) => {
      const newL = [...prev];
      newL[index].count = count;
      return newL;
    });
  };
  const updateProductInCart = async () => {
    if (product.count < 1) {
      toast.error("Count must be a number greater than 1 ");
      return;
    }
    console.log("1");
    const res = await updateProductInCartAPI({
      user_id: user.id,
      product_id: product.id,
      count: product.count,
    });
  };
  return (
    <div className="relative w-full h-24 flex justify-between items-end p-2 outline outline-1 outline-red-400 rounded-lg">
      <div className="w-full h-full flex gap-2 items-center text-red-900">
        <img
          className="size-20 object-contain bg-red-200 rounded-lg"
          src={product.image}
          alt=""
        />
        <div className="flex flex-col">
          <div className="text-sm font-bold text-ellipsis">{product.name}</div>
          <div className="text-red-400 font-bold text-ellipsis">
            {((product.price * (100 - product.discount)) / 100).toLocaleString(
              "vi-VN"
            ) + "đ  "}
            <del className="text-xs text-gray-400">
              {product.price.toLocaleString("vi-VN")}đ
            </del>
          </div>
          <div className="text-md flex gap-2 items-center">
            <div> Count:</div>
            <input
              className="pl-2 bg-red-100 w-12 outline-none"
              value={product.count}
              type="number"
              onChange={(e) => {
                updateProduct(e.target.value);
              }}
              onBlur={updateProductInCart}
            />
          </div>
        </div>
      </div>
      <HiOutlineShoppingBag
        className="cursor-pointer p-1 flex-shrink-0 size-9 bg-red-400 rounded-lg text-white hover:scale-125 hover:rounded-md hover:p-[6px] transition-all duration-1000"
        onClick={() =>
          setListOrder((prev) => {
            const newList = [...prev];
            if (newList.find((p) => p.id === product.id)) return newList;
            return [...newList, product];
          })
        }
      />
      <HiOutlineXCircle
        className="cursor-pointer absolute top-[2px] right-[2px] size-5 text-red-400"
        onClick={deleteProductInCart}
      />
    </div>
  );
}
