import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { orderAPI } from "../../services/order.api";
import useMainContext from "../../hooks/useMainContext";
import { useNavigate } from "react-router-dom";

export default function Payment({ listOrder, setListOrder }) {
  const [sumPrice, setSumPrice] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < listOrder.length; i++) {
      sum +=
        (listOrder[i].price *
          (100 - listOrder[i].discount) *
          listOrder[i].count) /
        100;
    }
    setSumPrice(sum);
  }, [listOrder]);
  const { user } = useMainContext();
  const order = async () => {
    if (listOrder.length < 1) return;
    const res = await orderAPI({ user_id: user.id, listOrder: listOrder });
    navigate("/delivery");
  };
  return (
    <>
      <div className=" flex flex-col gap-4  p-4 shadow-md shadow-red-500/40 rounded-xl ">
        <div className="text-xl font-bold text-red-900"> Payment</div>
        <table className="w-full text-sm text-left rounded-xl">
          <thead className="text-xs text-white uppercase bg-red-400 rounded-xl">
            <tr>
              <th scope="col" className="px-3 py-2">
                Product name
              </th>
              <th scope="col" className="px-3 py-2">
                Price
              </th>
              <th scope="col" className="px-3 py-2">
                Count
              </th>
              <th scope="col" className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {listOrder.map((product) => {
              return (
                <tr className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-3 py-4 font-bold text-red-900 whitespace-nowrap bg-red-50"
                  >
                    {product.name}
                  </th>
                  <td className="px-3 py-4 text-red-900">
                    {" "}
                    {(
                      (product.price * (100 - product.discount)) /
                      100
                    ).toLocaleString("vi-VN")}
                    đ
                  </td>
                  <td className="px-3 py-4 text-center text-red-900">
                    {product.count}
                  </td>
                  <td className="px-3 py-4 text-center text-red-900">
                    <HiOutlineTrash
                      className="size-4 hover:text-red-500"
                      onClick={() => {
                        setListOrder((prev) =>
                          prev.filter((p) => p.id !== product.id)
                        );
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="p-2 bg-red-100 font-bold text-red-900 text-lg text-center">
          {sumPrice > 0 && ` Sum: ${sumPrice.toLocaleString("vi-VN")}đ`}
        </div>
        <div className="flex justify-end ">
          <button
            className="font-medium text-white p-2 bg-red-400 rounded-md"
            onClick={order}
          >
            {listOrder.length === 0 ? "Add something" : "Order Now"}
          </button>
        </div>
      </div>
      {/* <div className="fixed bottom-16 left-0 w-full h-24 translate-y-[200%]  flex-col gap-4 flex-grow bg-red-400 border-white border-b-2 max-sm:block max-sm:translate-y-0 transition-all duration-500">
        Payment
      </div> */}
    </>
  );
}
