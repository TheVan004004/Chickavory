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

export const updateStatusForUserAPI = async (order_id) => {
  const data = {
    order_id: order_id,
  };
  return axios.put(urlAPI.updateStatusForUser, data);
};

export const updateStatusForAdminAPI = async (order_id) => {
  const data = {
    order_id: order_id,
  };
  return axios.put(urlAPI.updateStatusForAdmin, data);
};

export const getChartOrderStatusAPI = (option) => {
  return axios.get(urlAPI.getChartStatusOrder, { params: { option: option } });
};

export const getYearlyRevenueAPI = () => {
  return axios.get(urlAPI.getYearlyRevenue);
};

export const getYearlyOrderAPI = () => {
  return axios.get(urlAPI.getYearlyBuyturn);
};
