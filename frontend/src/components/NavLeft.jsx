import React from "react";

export default function NavLeft() {
  return (
    <div className="fixed top-20 w-16 flex flex-col gap-4 justify-center items-center z-[-1]">
      <div
        className="size-12 rounded-full border-b-2
        flex justify-center items-center cursor-pointer
      "
      >
        Gà
      </div>
      <div
        className="size-12 rounded-full border-b-2
        flex justify-center items-center cursor-pointer
      "
      >
        Nước
      </div>
      <div
        className="size-12 rounded-full border-b-2
        flex justify-center items-center cursor-pointer
      "
      >
        Khác
      </div>
    </div>
  );
}
