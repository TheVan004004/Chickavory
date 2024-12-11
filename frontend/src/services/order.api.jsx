import axios from "axios";

const orderAPI = (input) => {
  const { user_id, listOrder } = input;
  const data = {
    user_id: user_id,
    listOrder: listOrder,
  };
  console.log(data);
  return axios.post("http://localhost:8080/api/user/order", data);
};

export { orderAPI };
