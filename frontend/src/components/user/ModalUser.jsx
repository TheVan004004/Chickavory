import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import useMainContext from "../../hooks/useMainContext";
import { HiOutlineXCircle } from "react-icons/hi";
import { HiOutlineKey } from "react-icons/hi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { isRequired, minChar, validate } from "../../validation";
import { loginAPI } from "../../services/user.api";
import { useNavigate } from "react-router-dom";
export default function ModalUser() {
  const {
    isOpenModalUser,
    setIsOpenModalUser,
    stateModalUser,
    setStateModalUser,
    setUser,
  } = useMainContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    const nameError = validate(username, [isRequired]);
    const passwordError = validate(password, [isRequired]);
    if (nameError === passwordError) {
      setError(nameError);
    } else {
      setError(nameError + passwordError);
    }
    if (!error) {
      try {
        const res = await loginAPI({ username, password });
        console.log(res.data);
        setUser(res.data.user);
        if (res.data.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        reset();
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handlRegister = () => {
    console.log("register");
  };
  const reset = () => {
    setIsOpenModalUser(false);
    setUsername("");
    setPassword("");
    setError("");
  };
  return (
    <>
      {isOpenModalUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-20">
          <div className="relative w-[450px] p-6 pb-8 flex flex-col gap-4 bg-white rounded-xl z-30">
            <div className=" font-semibold text-3xl">Welcome Chickavory</div>
            <div className="flex gap-3 items-center mt-2">
              <HiOutlineUserCircle className="text-yellow-500 size-7" />
              <input
                className="flex-grow py-2 px-4 rounded-xl outline-none border-yellow-500 border-2"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>

            <div className="flex gap-3 items-center mt-2">
              <HiOutlineKey className="text-yellow-500 size-7" />
              <input
                className="flex-grow py-2 px-4 rounded-xl outline-none border-yellow-500 border-2"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            {stateModalUser !== "login" && (
              <div className="flex gap-3 items-center mt-2">
                <HiOutlineCheckCircle className="text-yellow-500 size-7" />
                <input
                  className="flex-grow py-2 px-4 rounded-xl outline-none border-yellow-500 border-2"
                  placeholder="Nhập lại mật khẩu"
                ></input>
              </div>
            )}
            {error && <div className="text-red-500">Note: {error}</div>}

            <div className=" self-end text-sm">
              {stateModalUser === "login"
                ? "Nếu bạn mới biết đến Chickavory? "
                : "Nếu bạn đã có tài khoản? "}
              <div
                className="inline text-gray-400 hover:text-yellow-500 cursor-pointer"
                onClick={() => {
                  setStateModalUser((prev) =>
                    prev === "login" ? "register" : "login"
                  );
                }}
              >
                {stateModalUser === "login" ? "Sign up now" : "Login"}
              </div>
            </div>
            <button
              className="p-2 rounded-xl bg-yellow-500 font-semibold text-xl"
              onClick={stateModalUser === "login" ? handleLogin : handlRegister}
            >
              {stateModalUser === "login" ? "Login" : "Sign up"}
            </button>
            <HiOutlineXCircle
              className="absolute top-2 right-2 size-8 text-yellow-500"
              onClick={() => setIsOpenModalUser(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}