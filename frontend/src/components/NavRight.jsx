import React from "react";
import { useNavigate } from "react-router-dom";
import useMainContext from "../hooks/useMainContext";
export default function NavRight() {
  const { setIsOpenNavRight, isOpenNavRight, setUser } = useMainContext();
  const navigate = useNavigate();
  const body = () => (
    <>
      <button
        className="py-2 hover:bg-black/20 hover:text-white hover:font-semibold"
        onClick={() => navigate("/cart")}
      >
        Giỏ hàng
      </button>
      <button
        className="py-2 hover:bg-black/20 hover:text-white hover:font-semibold"
        onClick={() => {
          setUser("");
          setIsOpenNavRight(false);
        }}
      >
        Đăng xuất
      </button>
    </>
  );
  return (
    <>
      <div
        className={
          "fixed right-0 top-16 z-[2] bg-red-900 w-40 flex flex-col gap-0 pb-3 rounded-b-xl text-white  transition-all duration-500 max-md:hidden" +
          (isOpenNavRight ? " translate-y-0" : " translate-y-[-100%]")
        }
      >
        {body()}
      </div>
      <div
        className={
          "fixed hidden right-0 bottom-16 z-[2] bg-red-900 w-40 max-md:flex flex-col gap-0 pt-3 rounded-t-xl text-white transition-transform duration-500" +
          (isOpenNavRight ? " translate-y-0" : " translate-y-[200%]")
        }
      >
        {body()}
      </div>
    </>
  );
}