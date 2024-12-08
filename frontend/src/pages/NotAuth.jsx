import React from "react";
import notauth from "../assets/notauth.jpg";
export default function NotAuth() {
  return (
    <div className="min-h-[calc(100vh-5rem)] max-md:min-h-[calc(100vh-8rem)] flex gap-3 flex-col justify-center items-center">
      <img className="w-64 h-auto" src={notauth} alt="" />
      <div className="text-red-400 font-semibold text-lg text-center">
        Bạn phải đăng nhập để sử dụng tính năng này
      </div>
    </div>
  );
}
