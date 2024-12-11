import React from "react";
import delivery from "../assets/delivery.jpg";
export default function Delivery() {
  return (
    <div className="min-h-[calc(100vh-5rem)] max-md:min-h-[calc(100vh-8rem)] flex gap-3 flex-col justify-center items-center">
      <img className="w-64 h-auto" src={delivery} alt="" />
      <div className="text-red-400 font-semibold text-lg text-center">
        Order successfully, we will deliver to you as quickly as possible
      </div>
    </div>
  );
}
