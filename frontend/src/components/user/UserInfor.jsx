import React, { useEffect, useState } from "react";
import useMainContext from "../../hooks/useMainContext";
import { updateAPI } from "../../services/user.api";
import { getProductsInCartAPI } from "../../services/cart.api";
import { isPhoneNumber } from "../../validation";
import { toast } from "react-toastify";
import { HiOutlinePencilAlt } from "react-icons/hi";
import ModalUpdatePassword from "./ModalUpdatePassword";
export default function UserInfor() {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useMainContext();
  const [fullname, setFullname] = useState(user.fullname);
  const [address, setAddress] = useState(user.address);
  const [phonenumber, setPhonenumber] = useState(user.phonenumber);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);

  const updateUser = async () => {
    const error = isPhoneNumber(phonenumber);
    if (error) {
      toast.error(error);
      return;
    }
    try {
      await updateAPI({
        user_id: user.id,
        address: address,
        fullname: fullname,
        phonenumber: phonenumber,
      });
      setIsEdit(false);
    } catch (e) {
      toast.error(e.response);
    }
  };
  return (
    <div className="flex flex-col gap-4 flex-grow p-4 shadow-md shadow-red-500/50 rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-shadow duration-500">
      <div className="font-semibold text-3xl">@{user.username}</div>
      <table>
        <tr>
          <td>
            <div className=" font-medium">Fullname: </div>
          </td>
          <td className="py-2">
            <input
              className={
                "rounded-xl pl-4 py-2 outline-none w-full transition-colors duration-500" +
                (isEdit ? " bg-red-100" : " cursor-not-allowed bg-slate-100")
              }
              placeholder=""
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              disabled={!isEdit}
            ></input>
          </td>
        </tr>
        <tr>
          <td>
            <div className=" font-medium ">Phone Number: </div>
          </td>
          <td className="py-2">
            <input
              className={
                "rounded-xl pl-4 py-2 outline-none w-full transition-colors duration-500" +
                (isEdit ? " bg-red-100" : " cursor-not-allowed bg-slate-100")
              }
              placeholder=""
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              disabled={!isEdit}
            ></input>
          </td>
        </tr>
        <tr>
          <td>
            <div className=" font-medium ">Address: </div>
          </td>
          <td className="py-2">
            <input
              className={
                "rounded-xl pl-4 py-2 outline-none w-full transition-colors duration-500" +
                (isEdit ? " bg-red-100" : " cursor-not-allowed bg-slate-100")
              }
              placeholder=""
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!isEdit}
            ></input>
          </td>
        </tr>

        <tr>
          <td>
            <div className=" font-medium ">Password: </div>
          </td>
          <td className="py-2 flex gap-4 items-center">
            <input
              className={
                "rounded-xl pl-4 py-2 outline-none w-full transition-colors duration-500" +
                (isEdit
                  ? " bg-red-100 cursor-not-allowed"
                  : " cursor-not-allowed bg-slate-100")
              }
              placeholder=""
              value="password"
              disabled
              type="password"
            ></input>
            <HiOutlinePencilAlt
              className="size-8 cursor-pointer"
              onClick={() => setIsUpdatePassword(true)}
            />
          </td>
        </tr>
      </table>
      {/* <div className="flex-grow border-red-900 border-[1px] rounded-xl"></div> */}
      <div className="flex justify-end items-center gap-4">
        <button
          className="px-4 py-1 border-red-400 border-2 border-dashed rounded-xl text-red-400 font-medium"
          onClick={() => setIsEdit(true)}
        >
          Edit
        </button>
        <button
          className={
            "px-4 py-1 bg-red-400 border-red-400 border-2 rounded-xl text-white font-medium" +
            (isEdit ? "" : " cursor-not-allowed")
          }
          onClick={updateUser}
          disabled={!isEdit}
        >
          Save
        </button>
      </div>
      <ModalUpdatePassword
        isUpdatePassword={isUpdatePassword}
        setIsUpdatePassword={setIsUpdatePassword}
      />
    </div>
  );
}
