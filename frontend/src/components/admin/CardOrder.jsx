import React, { useMemo, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import {
  updateStatusForAdminAPI,
  updateStatusForUserAPI,
} from "../../services/order.api";
import { toast } from "react-toastify";
import ModalOrderDetail from "./ModalOrderDetail.jsx";
import { timeAgo } from "../../services/format.date.jsx";

export default function CardOrder({ getOrders, order }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const totalPrice = useMemo(() => {
    return order.listProduct?.reduce((total, product) => {
      return total + product.price * product.count;
    }, 0);
  }, [order]);
  const time = timeAgo(order.created_at);
  const updateStatusOrder = async () => {
    try {
      await updateStatusForAdminAPI(order.id);
      getOrders();
      toast.success("Update status succesfully");
    } catch (e) {
      toast.error(e.response);
    }
  };
  const getStatus = (status) => {
    const statusStyles = {
      pending: {
        class: "bg-red-200 hover:bg-red-300 border-red-800",
        function: () => updateStatusOrder(),
      },
      processing: {
        class: "bg-orange-200 hover:bg-orange-300 border-orange-800",
      },
      completed: {
        class: "bg-green-200 hover:bg-green-300 border-green-800",
      },
    };

    return (
      <button
        className={
          "border-2 font-semibold border-solid px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 " +
          statusStyles[status]?.class
        }
        onClick={statusStyles[status]?.function}
      >
        {status}
      </button>
    );
  };
  return (
    <>
      <tr className="border-b text-red-950  bg-yellow-50">
        <td className="px-6 py-4 text-center">{order.id}</td>
        <td className="px-6 py-4">{order.user.fullname}</td>
        <td className="px-6 py-4">{order.user.phonenumber}</td>
        <td className="px-6 py-4">{order.user.address}</td>
        <td className="px-6 py-4 ">{time}</td>
        <td className="px-6 py-4">{totalPrice.toLocaleString("vi-VN")} VND</td>
        <td className="text-center">{getStatus(order.status)}</td>
        <td className="text-center">
          <HiOutlineEye
            className="size-6 hover:scale-125 transition-all duration-300"
            onClick={() => setIsOpenModal(true)}
          />
        </td>
      </tr>
      <div className="*:text-red-950">
        <ModalOrderDetail
          status={getStatus(order.status)}
          order={order}
          totalPrice={totalPrice}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </div>
    </>
  );
}
