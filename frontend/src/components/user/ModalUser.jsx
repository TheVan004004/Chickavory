import React, { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import useMainContext from "../../hooks/useMainContext";
import { HiOutlineKey } from "react-icons/hi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import {
  isConfirmedPassword,
  minChar,
  minCharPassword,
  validate,
  validateForm,
} from "../../validation";
import { loginAPI, signupAPI } from "../../services/user.api";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    reset();
  }, [isOpenModalUser, stateModalUser]);
  const handleLogin = async () => {
    const form = [
      { value: username, validates: [] },
      { value: username, validates: [] },
    ];
    const listError = validateForm(form);
    setError((prev) => {
      let errorReturn = "";
      listError.forEach((error) => {
        errorReturn += error;
      });
      return errorReturn;
    });
    if (listError.size === 0) {
      try {
        const res = await loginAPI({ username, password });
        setUser(res.data.user);
        if (res.data.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        setIsOpenModalUser(false);
        reset();
      } catch (e) {
        console.log(e);
        setError(e.response.data.messages);
      }
    }
  };

  const handlRegister = async () => {
    const form = [
      { value: username, validates: [] },
      { value: password, validates: [{ function: minCharPassword, check: 5 }] },
      {
        value: confirmPassword,
        validates: [{ function: isConfirmedPassword, check: password }],
      },
    ];
    const listError = validateForm(form);
    setError((prev) => {
      let errorReturn = "";
      listError.forEach((error) => {
        errorReturn += error;
      });
      return errorReturn;
    });
    if (listError.size === 0) {
      try {
        const res = await signupAPI({ username, password });
        setUser(res.data.user);
        setIsOpenModalUser(false);
        reset();
      } catch (e) {
        console.log(e);
        setError(e.response.data.messages);
      }
    }
  };
  const reset = () => {
    setUsername("");
    setPassword("");
    setError("");
    setConfirmPassword("");
  };
  return (
    <Modal isOpenModal={isOpenModalUser} setIsOpenModal={setIsOpenModalUser}>
      <div className="p-8 pt-6 flex flex-col gap-4 w-[550px]">
        <div className=" font-semibold text-3xl">Welcome Chickavory</div>
        <div className="flex gap-3 items-center mt-2">
          <HiOutlineUserCircle className="text-yellow-500 size-7" />
          <input
            className="flex-grow py-2 px-4 rounded-xl outline-none border-yellow-500 border-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>

        <div className="flex gap-3 items-center mt-2">
          <HiOutlineKey className="text-yellow-500 size-7" />
          <input
            className="flex-grow py-2 px-4 rounded-xl outline-none border-yellow-500 border-2"
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        {stateModalUser !== "login" && (
          <div className="flex gap-3 items-center mt-2">
            <HiOutlineCheckCircle className="text-yellow-500 size-7" />
            <input
              className="flex-grow py-2 px-4 rounded-xl outline-none border-yellow-500 border-2"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
        )}
        {error && <div className="text-red-500 text-wrap">{error}</div>}

        <div className=" self-end text-sm">
          {stateModalUser === "login"
            ? "If you are new to Chickavory, "
            : "Already have an account? "}
          <div
            className="inline text-gray-400 hover:text-yellow-500 cursor-pointer"
            onClick={() => {
              setStateModalUser((prev) =>
                prev === "login" ? "register" : "login"
              );
            }}
          >
            {stateModalUser === "login" ? "sign up now" : "Log in here!"}
          </div>
        </div>
        <button
          type="primary"
          className="p-2 rounded-xl bg-yellow-500 font-semibold text-xl"
          onClick={stateModalUser === "login" ? handleLogin : handlRegister}
        >
          {stateModalUser === "login" ? "Login" : "Sign up"}
        </button>
      </div>
    </Modal>
  );
}
