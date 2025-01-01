import React from "react";
import { HiOutlineTag, HiOutlinePlusSm } from "react-icons/hi";
import CountDownTime from "../CountDown";
import useMainContext from "../../hooks/useMainContext";
import { addToCartAPI } from "../../services/cart.api";
import { toast } from "react-toastify";
export default function Product({ product }) {
  const { name, price, image, discount, id } = product;
  const { user } = useMainContext();
  const handleAddToCart = async () => {
    try {
      if (!user && !user.id) {
        toast.error("Please login before order something");
        return;
      }
      const res = await addToCartAPI({
        user_id: user.id,
        product_id: id,
        count: 1,
      });
      // console.log(res.data);
      toast.success(res.data.messages);
    } catch (e) {
      toast.error(e.response);
    }
  };
  return (
    <div className="rounded-xl p-4 h-auto shadow-md shadow-red-400/50 hover:shadow-lg hover:shadow-red-400/50 transition-all duration-1000">
      <div className="rounded-xl border-[1px] border-red-500 bg-red-100">
        <img
          className="w-full max-h-[200px] rounded-xl object-contain"
          src={image}
          alt=""
        />
      </div>
      <div className="font-medium py-2 text-xl max-sm:text-2xl">{name}</div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          {discount ? (
            <>
              <p className="text-red-400 font-semibold text-3xl max-sm:text-4xl">
                {((price * (100 - discount)) / 100).toLocaleString("vi-VN")}đ
              </p>
              <div className="flex gap-2 items-center">
                <HiOutlineTag className="rotate-90 text-red-400 size-5" />
                <del className="text-gray-400">
                  {price.toLocaleString("vi-VN")}đ
                </del>
              </div>
            </>
          ) : (
            <>
              <p className="text-red-400 font-semibold text-3xl max-sm:text-4xl">
                {price.toLocaleString("vi-VN")}đ
              </p>
            </>
          )}
        </div>
        <div className="bg-red-400 rounded-xl size-12 max-sm:size-16 flex justify-center items-center">
          <HiOutlinePlusSm
            className="size-8 max-sm:size-12 text-white hover:scale-150 transition-all duration-500"
            onClick={handleAddToCart}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
