import React, { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
export default function Pagination({ count }) {
  const [array, setArray] = useState([]);
  useEffect(() => {
    let newArr = [];
    for (let i = 0; i < count; i++) newArr.push(i + 1);
    setArray(newArr);
  }, []);
  return (
    <div className="flex justify-center gap-4">
      <HiChevronLeft className="size-6 rounded-full hover:bg-slate-200" />
      {array.map((num, index) => {
        return (
          <div
            key={index}
            className="size-6 rounded-full bg-slate-200 flex justify-center items-center"
          >
            {num}
          </div>
        );
      })}
      <HiChevronRight className="size-6 rounded-full hover:bg-slate-200" />
    </div>
  );
}
