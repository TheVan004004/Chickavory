import React from "react";
import Modal from "../modal/Modal";
import { formatDate } from "../../services/format.date";

export default function ModalOrderDetail({
  setIsOpenModal,
  isOpenModal,
  status,
  order,
  totalPrice,
}) {
  const time = formatDate(order.created_at);
  return (
    <Modal setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal}>
      <div className="p-8 flex flex-col gap-4 ">
        <h2 className="font-bold text-3xl"> Order detail</h2>
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-4">
            <div>
              <b>Order ID: </b>
              {order.id}
            </div>
            <div>
              <b>User: </b>
              {order.user.fullname}
            </div>
            <div>
              <b>Address: </b>
              {order.user.address}
            </div>
            <div>
              <b>Phone number: </b>
              {order.user.phonenumber}
            </div>
            <div>
              <b>Created at: </b>
              {time}
            </div>
          </div>
          {status}
        </div>

        <div className="font-bold ">Payment:</div>
        <table className=" table-fixed border-collapse border border-red-200">
          <thead>
            <tr className="bg-red-100">
              <th className="border border-red-300 px-4 py-2 w-52 text-nowrap">
                Product Name
              </th>
              <th className="border border-red-300 px-4 py-2 w-52 text-nowrap">
                Price
              </th>
              <th className="border border-red-300 px-4 py-2">Quantity</th>
              <th className="border border-red-300 px-4 py-2 w-56 text-nowrap">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {order.listProduct.map((product, index) => {
              return (
                <tr key={index} className="text-center">
                  <td className="border border-red-300 px-4 py-2">
                    {product.name}
                  </td>
                  <td className="border border-red-300 px-4 py-2 text-nowrap">
                    {(product.price * 1).toLocaleString("vi-VN")} VND
                  </td>
                  <td className="border border-red-300 px-4 py-2">
                    {product.count}
                  </td>
                  <td className="border border-red-300 px-4 py-2 text-nowrap">
                    {(product.price * product.count).toLocaleString("vi-VN")}{" "}
                    VND
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-red-100 text-center">
              <td className="border border-red-300 px-4 py-2" colSpan={3}>
                Total order
              </td>
              <td className="border border-red-300 px-4 py-2 text-nowrap">
                {totalPrice.toLocaleString("vi-VN")} VND
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Modal>
  );
}
