import React, { useEffect, useState } from "react";
export default function UserInfor() {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="flex flex-col gap-4 flex-grow p-4 shadow-md shadow-red-500/50 rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-shadow duration-500">
      <div className="font-semibold text-3xl">@Tên đăng nhập</div>
      <table>
        <tr>
          <td>
            <div className=" font-medium">Họ Tên: </div>
          </td>
          <td className="py-2">
            <input
              className={
                "rounded-xl pl-4 py-2 outline-none w-full transition-colors duration-500" +
                (isEdit ? " bg-slate-300" : " cursor-not-allowed bg-slate-100")
              }
              placeholder="Vui lòng nhập trường này"
              value="text"
              disabled={!isEdit}
            ></input>
          </td>
        </tr>
        <tr>
          <td>
            <div className=" font-medium ">Số điện thoại: </div>
          </td>
          <td className="py-2">
            <input
              className={
                "rounded-xl pl-4 py-2 outline-none w-full transition-colors duration-500" +
                (isEdit ? " bg-slate-300" : " cursor-not-allowed bg-slate-100")
              }
              placeholder="Vui lòng nhập trường này"
              value="text"
              disabled={!isEdit}
            ></input>
          </td>
        </tr>
        <tr>
          <td>
            <div className=" font-medium ">Địa chỉ: </div>
          </td>
          <td className="py-2">
            <input
              className={
                "rounded-xl pl-4 py-2 outline-none w-full transition-colors duration-500" +
                (isEdit ? " bg-slate-300" : " cursor-not-allowed bg-slate-100")
              }
              placeholder="Vui lòng nhập trường này"
              value="text"
              disabled={!isEdit}
            ></input>
          </td>
        </tr>
        <tr>
          <td>
            <div className=" font-medium ">Mật khẩu: </div>
          </td>
          <td className="py-2">
            <input
              className={
                "rounded-xl pl-4 py-2 outline-none w-full transition-colors duration-500" +
                (isEdit ? " bg-slate-300" : " cursor-not-allowed bg-slate-100")
              }
              placeholder="Vui lòng nhập trường này"
              value="text"
              disabled={!isEdit}
              type="password"
            ></input>
          </td>
        </tr>
      </table>
      <div className="flex-grow border-red-900 border-[1px] rounded-xl"></div>
      <div className="flex justify-end items-center gap-4">
        <button
          className="px-4 py-1 border-red-400 border-2 border-dashed rounded-xl text-red-400 font-medium"
          onClick={() => setIsEdit(true)}
        >
          Chỉnh sửa
        </button>
        <button
          className="px-4 py-1 bg-red-400 border-red-400 border-2 rounded-xl text-white font-medium"
          onClick={() => setIsEdit(false)}
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
