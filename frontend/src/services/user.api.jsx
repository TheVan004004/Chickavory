import axios from "axios";
import { urlAPI } from "./url";

export const loginAPI = ({ username, password }) => {
  const data = {
    username: username,
    password: password,
  };
  return axios.post(urlAPI.login, data);
};
export const updateAPI = ({ user_id, address, phonenumber, fullname }) => {
  const data = {
    user_id: user_id,
    address: address,
    phonenumber: phonenumber,
    fullname: fullname,
  };
  return axios.put(urlAPI.updateUser, data);
};

export const updatePasswordAPI = ({ user_id, currentPassword, password }) => {
  const data = {
    user_id: user_id,
    currentPassword: currentPassword,
    password: password,
  };
  return axios.put(urlAPI.updatePassword, data);
};

export const signupAPI = ({ username, password }) => {
  const data = {
    username: username,
    password: password,
  };
  return axios.post(urlAPI.signup, data);
};
