import axios from "axios";

const loginAPI = (input) => {
  const { username, password } = input;
  const data = {
    username: username,
    password: password,
  };
  console.log(data);
  return axios.post("http://localhost:8080/api/user/login", data);
};
const updateAPI = (input) => {
  const { user_id, address, phonenumber, fullname } = input;
  const data = {
    user_id: user_id,
    address: address,
    phonenumber: phonenumber,
    fullname: fullname,
  };
  console.log(data);
  return axios.put("http://localhost:8080/api/user/update", data);
};
export { loginAPI, updateAPI };
