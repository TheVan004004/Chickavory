import axios from "axios";
import { urlAPI } from "./url";

export const orderAPI = ({ user_id, listOrder }) => {
  const data = {
    user_id: user_id,
    listOrder: listOrder,
  };
  return axios.post(urlAPI.order, data);
};

export const getOrdersAPI = async ({ user_id, status }) => {
  const data = {
    params: {
      user_id: user_id,
      status: status,
    },
  };
  return axios.get(urlAPI.getOrder, data);
};
