import React from "react";
import useMainContext from "../../../hooks/useMainContext";

export default function OptionSortForSmallView({ option }) {
  const { setSort_by } = useMainContext();
  return (
    <div
      className="bg-red-200 shadow-md shadow-red-400/20 py-6 text-red-800 flex justify-center items-center h-full w-full hover:bg-red-400 rounded-xl hover:text-white font-medium"
      onClick={() => setSort_by(option.sort_by)}
    >
      {option.name}
    </div>
  );
}
