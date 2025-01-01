import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { updatePasswordAPI } from "../../services/user.api";
import useMainContext from "../../hooks/useMainContext";
import {
  isConfirmedPassword,
  minCharPassword,
  validateForm,
} from "../../validation";
import { toast } from "react-toastify";

export default function ModalUpdatePassword({
  isUpdatePassword,
  setIsUpdatePassword,
}) {
  const { user } = useMainContext();
  const [currPassword, setCurrPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setCurrPassword("");
    setCurrPassword("");
    setPassword("");
    setError("");
  }, [isUpdatePassword]);
  const handleChangePassword = async () => {
    const form = [
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
    if (listError.size > 0) return;
    try {
      await updatePasswordAPI({
        user_id: user.id,
        currentPassword: currPassword,
        password: password,
      });
    } catch (e) {
      setError(e.response.data.messages);
    }
  };
  return (
    <Modal isOpenModal={isUpdatePassword} setIsOpenModal={setIsUpdatePassword}>
      <div className="p-4 flex flex-col gap-4 w-[520px]">
        <h2 className="font-bold text-2xl mb-4">Update Password</h2>
        <div className=" flex gap-2 justify-between items-center">
          <div>Current Password: </div>
          <input
            className="bg-red-50 rounded-xl px-4 py-1 outline-none w-[300px]"
            value={currPassword}
            onChange={(e) => setCurrPassword(e.target.value)}
          />
        </div>
        <div className=" flex gap-4 justify-between items-center">
          <div>New Password: </div>
          <input
            className="bg-red-50 rounded-xl px-4 py-1 outline-none w-[300px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className=" flex gap-4 justify-between items-center ">
          <div>Confirm New Password: </div>
          <input
            className="bg-red-50 rounded-xl px-4 py-1 outline-none w-[300px]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-red-900">{error}</div>}

        <button
          className="bg-red-900 py-2 rounded-xl mt-4 text-white font-bold"
          onClick={handleChangePassword}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
