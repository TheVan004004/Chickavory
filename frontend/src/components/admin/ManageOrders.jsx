import React, { useEffect, useState } from "react";
import { getOrdersAPI } from "../../services/order.api";
import CardOrder from "./CardOrder";

export default function ManageOrders() {
  const [listOrders, setListOrders] = useState();
  const [state, setState] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    getOrders();
  }, [state]);

  const getOrders = async () => {
    const res = await getOrdersAPI({
      user_id: userId,
      status: state,
    });
    setListOrders(res.data);
  };
  return (
    <>
      <div className="flex gap-4 items-center">
        <div className="py-2 px-4 w-48 flex justify-between bg-red-900 rounded-xl text-white">
          <div>Status:</div>
          <select
            className="bg-transparent outline-none"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="py-2 px-4 w-32 flex gap-2 justify-between bg-red-900 rounded-xl text-white">
          <div className="text-nowrap">User Id:</div>
          <input
            className="bg-transparent outline-none "
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getOrders();
              }
            }}
          />
        </div>
      </div>

      <div className="flex gap-4 justify-between">
        <div className="relative overflow-x-auto sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-white table-fixed">
            <thead className="text-xs text-white uppercase bg-red-900 ">
              <tr>
                <th scope="col" className="px-6 py-3 w-28">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
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
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 w-20"></th>
              </tr>
            </thead>
            <tbody className="bg-red-400">
              {listOrders?.map((order, index) => {
                return (
                  <CardOrder
                    order={order}
                    getOrders={getOrders}
                    key={order.id}
                  />
                );
              })}
            </tbody>
          </table>
          {/* <div
            className={
              "fixed top-0 left-0 bg-black opacity-50 w-full h-full overflow-x-auto sm:rounded-lg z-10 flex flex-col gap-6 justify-center items-center " +
              (isSaving ? " flex" : " hidden")
            }
          >
            <svg
              aria-hidden="true"
              className="size-16 text-gray-200 animate-spin fill-red-900"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <p className="text-2xl text-white">Waiting for loading...</p>
          </div> */}
        </div>
      </div>
    </>
  );
}
