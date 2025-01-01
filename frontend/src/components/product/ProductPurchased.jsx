import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import useMainContext from "../../hooks/useMainContext";
import { addToCartAPI } from "../../services/cart.api";
import { toast } from "react-toastify";
export default function ProductPurchased({ product }) {
  const { user } = useMainContext();
  const handleAddToCart = async () => {
    try {
      const res = await addToCartAPI({
        user_id: user.id,
        product_id: product.id,
        count: 1,
      });
      // console.log(res.data);
      toast.success(res.data.messages);
    } catch (e) {
      toast.error(e.response);
    }
  };
  return (
    <div className="w-full h-[104px] flex gap-2 max-md:gap-4 justify-between items-center border-red-700 border-[1px] p-2 rounded-xl">
      <img className="h-full rounded-xl" src={product.image} alt="" />
      <div className="flex-grow flex flex-col justify-between">
        <div className=" font-medium text-ellipsis text-nowrap">
          {product.name}
        </div>
        <div className=" text-lg text-red-400 font-medium">
          {product.price.toLocaleString("vi-VN")} VND
        </div>
        <div className="w-24 py-1 bg-red-400 text-sm text-white font-medium text-center rounded-xl">
          Buyturn: {product.total_count}
        </div>
      </div>
      <button
        className="flex-shrink-0 size-20 text-sm bg-red-700 rounded-xl text-white font-semibold flex flex-col gap-1 justify-center items-center hover:text-yellow-400"
        onClick={handleAddToCart}
      >
        <HiOutlineShoppingBag className="size-6" />
        Reorder
      </button>
    </div>
  );
}
