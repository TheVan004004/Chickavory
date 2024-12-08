import React from "react";
import UserInfor from "../components/user/UserInfor";
import History from "../components/user/History";
import useMainContext from "../hooks/useMainContext";
import NotAuth from "./NotAuth";

export default function User() {
  const { user } = useMainContext();
  return (
    <>
      {user ? (
        <div className="p-4 pt-20 min-h-[calc(100vh-5rem)] max-md:min-h-[calc(100vh-8rem)] grid grid-cols-2 max-md:grid-cols-1 gap-4">
          <UserInfor />
          <History />
        </div>
      ) : (
        <NotAuth />
      )}
    </>
  );
}
