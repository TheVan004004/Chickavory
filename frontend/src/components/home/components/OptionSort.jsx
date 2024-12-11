import React from "react";
import useMainContext from "../../../hooks/useMainContext";

export default function OptionSort({ option, position }) {
  if (position === "first") {
    return (
      <div className="text-red-800 flex justify-center items-center h-full w-full hover:bg-red-400 rounded-l-xl font-medium text-xl hover:text-white cursor-pointer">
        {option.name}
      </div>
    );
  }
  if (position === "mid") {
    return (
      <div className="h-full w-full py-4 hover:bg-red-400 cursor-pointer">
        <div className="text-red-800 flex justify-center items-center h-full w-full border-l-[1px] border-red-400 font-medium text-xl hover:text-white">
          {option.name}
        </div>
      </div>
    );
  }
  if (position === "last") {
    return (
      <div className="h-full w-full py-4 hover:bg-red-400 rounded-r-xl cursor-pointer hover:rounded-r-xl">
        <div className="text-red-800 flex justify-center items-center h-full w-full hover:bg-red-400 border-l-[1px] border-red-400 font-medium text-xl hover:text-white">
          {option.name}
        </div>
      </div>
    );
  }
}
