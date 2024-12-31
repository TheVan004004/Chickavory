import React from "react";
import { HiOutlineHome, HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineFire } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import useMainContext from "../hooks/useMainContext";
export default function Header() {
  const { isOpenNavRight, setIsOpenNavRight, setIsOpenModalUser, user } =
    useMainContext();
  return (
    <div
      className="fixed bg-red-900 w-full h-16 flex justify-between 
    px-12 items-center overflow-hidden
    transition-all duration-500 delay-500 z-10
    "
    >
      <div className="text-white font-semibold text-lg">Chickavory</div>
      <div className="text-white flex gap-8 max-md:translate-y-[-150%] transition-transform duration-500">
        <Link to="/">
          <HiOutlineHome className="h-8 w-8 hover:scale-125 cursor-pointer transition-all duration-500" />
        </Link>
        <Link to="news">
          <HiOutlineFire className="h-8 w-8 hover:text-yellow-400 hover:scale-125 cursor-pointer transition-all duration-500" />
        </Link>
        {user ? (
          <>
            {user?.role === "admin" ? (
              <HiOutlineMenu
                className="h-8 w-8 hover:scale-125 cursor-pointer transition-all duration-500"
                onClick={() => setIsOpenNavRight((prev) => !prev)}
              />
            ) : (
              <>
                <Link to="cart">
                  <HiOutlineShoppingBag className="h-8 w-8 hover:scale-125 cursor-pointer transition-all duration-500" />
                </Link>
                <HiOutlineMenu
                  className="h-8 w-8 hover:scale-125 cursor-pointer transition-all duration-500"
                  onClick={() => setIsOpenNavRight((prev) => !prev)}
                />
              </>
            )}
          </>
        ) : (
          <HiOutlineUserCircle
            className="h-8 w-8 hover:scale-125 cursor-pointer transition-all duration-500"
            onClick={() => {
              setIsOpenModalUser(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
