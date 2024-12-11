import React, { useEffect, useState } from "react";
import useMainContext from "../../hooks/useMainContext";
import { updateAPI } from "../../services/user.api";
import { getProductsInCartAPI } from "../../services/cart.api";
export default function UserInfor() {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useMainContext();
  const [fullname, setFullname] = useState(user.fullname);
  const [address, setAddress] = useState(user.address);
  const [phonenumber, setPhonenumber] = useState(user.phonenumber);

  const updateUser = async () => {
    await updateAPI({
      user_id: user.id,
      address: address,
      fullname: fullname,
      phonenumber: phonenumber,
    });
    setIsEdit(false);
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
          <td className="py-2">
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
    </div>
  );
}
