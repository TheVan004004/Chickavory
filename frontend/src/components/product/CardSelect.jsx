import React from "react";
import drinks from "../../assets/Categories/drinks.jpg";
export default function CardSelect({ img }) {
  return (
    <div className="flex-shrink-0 size-20 rounded-2xl border-red-900 border-2 flex justify-center items-center hover:scale-110 transition-transform duration-500">
      <img src={img} className="w-full h-full object-cover rounded-2xl" />
    </div>
  );
}
