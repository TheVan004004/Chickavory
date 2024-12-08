import React from "react";

export default function Payment() {
  return (
    <>
      <div className="flex flex-col gap-4 flex-grow p-4 shadow-md shadow-red-500/40 rounded-xl max-sm:hidden">
        Payment
      </div>
      <div className="fixed bottom-16 left-0 w-full h-24 translate-y-[200%]  flex-col gap-4 flex-grow bg-red-900 border-white border-b-2 max-sm:block max-sm:translate-y-0 transition-all duration-500">
        Payment
      </div>
    </>
  );
}
