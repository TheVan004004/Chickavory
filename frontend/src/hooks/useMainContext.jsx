import { useContext } from "react";
import { MainContext } from "../states/states";

export default function useMainContext() {
  return useContext(MainContext);
}
