import { createContext, useEffect, useState } from "react";

export const MainContext = createContext({});

export const ContextWrapper = (props) => {
  const [isOpenNavRight, setIsOpenNavRight] = useState(false);
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);
  const [user, setUser] = useState("");
  const [stateModalUser, setStateModalUser] = useState("login");
  return (
    <MainContext.Provider
      value={{
        isOpenNavRight,
        setIsOpenNavRight,
        isOpenModalUser,
        setIsOpenModalUser,
        user,
        setUser,
        stateModalUser,
        setStateModalUser,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
