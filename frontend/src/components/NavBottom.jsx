import React from "react";
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineFire } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import useMainContext from "../hooks/useMainContext";
export default function NavBottom() {
  const { setIsOpenNavRight, setIsOpenModalUser, user } = useMainContext();
  return (
    <>
      <div
        className="fixed bottom-0 bg-red-900 text-white 
        w-full h-16 flex justify-center gap-12 px-12 items-center 
        translate-y-[100%] max-md:translate-y-[0%]
        transition-transform duration-500 z-10
      "
      >
        <Link to="/">
          <HiOutlineHome className="h-8 w-8 hover:scale-110 cursor-pointer transition-all duration-500" />
        </Link>
        <Link to="news">
          <HiOutlineFire className="h-8 w-8 hover:text-yellow-400 hover:scale-110 cursor-pointer transition-all duration-500" />
        </Link>
        {user ? (
          <Link to="user">
            <HiOutlineUserCircle className="h-8 w-8 hover:scale-110 cursor-pointer transition-all duration-500" />
          </Link>
        ) : (
          <HiOutlineUserCircle
            className="h-8 w-8 hover:scale-110 cursor-pointer transition-all duration-500"
            onClick={() => {
              setIsOpenModalUser(true);
            }}
          />
        )}

        {user && (
          <HiOutlineMenu
            className="h-8 w-8 hover:scale-125 cursor-pointer transition-all duration-500"
            onClick={() => setIsOpenNavRight((prev) => !prev)}
          />
        )}
      </div>
    </>
  );
}
