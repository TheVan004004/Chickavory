import React, { useEffect, useState } from "react";
import { getOrdersAPI } from "../../services/order.api";
import CardOrder from "./CardOrder";

export default function ListOrder({ user }) {
  const [listOrders, setListOrders] = useState([]);
  const [state, setState] = useState("");
  useEffect(() => {
    getOrder();
  }, [state]);
  const getOrder = async () => {
    const res = await getOrdersAPI({ user_id: user.id, status: state });
    setListOrders(res.data);
  };
  return (
    <div className=" w-full h-auto p-4 shadow-md shadow-red-500/40 rounded-xl overflow-y-auto">
      <div className="flex gap-8 *:font-bold *:cursor-pointer *:py-2">
        <div onClick={() => setState("")}>All</div>
        <div onClick={() => setState("pending")}>Pending</div>
        <div onClick={() => setState("processing")}>Processing</div>
        <div onClick={() => setState("completed")}>Completed</div>
      </div>
      <div className="h-[2px] w-96 bg-red-900"></div>
      <table className="mt-4 w-full text-sm text-left rtl:text-right text-white">
        <thead className="text-xs text-white uppercase bg-red-900 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Phone number
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Created at
            </th>
            <th scope="col" className="px-6 py-3">
              Total price
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Status
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-red-400">
          {listOrders?.map((order, index) => {
            return (
              <CardOrder
                getOrder={getOrder}
                index={index}
                order={order}
                key={order.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
