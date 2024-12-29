import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

export default function CardOrder({ order }) {
  return (
    <tr className=" border-b  text-red-950 bg-yellow-50">
      <td className="px-6 py-4">{order.id}</td>
      <td className="px-6 py-4">{order.buyturn}</td>
      <td className="px-6 py-4 ">
        <HiOutlineTrash
          className="size-6 hover:text-red-500"
          onClick={() => {}}
        />
      </td>
    </tr>
  );
}
