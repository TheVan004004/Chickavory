import React, { useEffect, useState } from "react";
import { getOrdersAPI } from "../../services/order.api";

export default function ListOrder({ user }) {
  const [listOrders, setListOrders] = useState([]);
  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = () => {
    const res = getOrdersAPI({ user_id: user.id, status: "" });
    console.log(res.data);
  };
  return (
    <div className=" w-full h-auto p-4 shadow-md shadow-red-500/40 rounded-xl overflow-y-auto">
      <table className="w-full text-sm text-left rtl:text-right text-white">
        <thead className="text-xs text-white uppercase bg-red-900 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order Id
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Created at
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-red-400">
          {listOrders?.map((order, index) => {
            return <CardOrder index={index} order={order} key={order.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
