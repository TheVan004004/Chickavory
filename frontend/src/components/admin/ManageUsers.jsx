import { useEffect, useState } from "react";
import { getUsersAPI } from "../../services/user.api";

export default function ManageUsers() {
  const [listUsers, setListUsers] = useState([]);
  const [sort_by, setSortBy] = useState("desc");
  useEffect(() => {
    getUsers();
  }, [sort_by]);

  const getUsers = async () => {
    const res = await getUsersAPI(sort_by);
    setListUsers(res.data);
  };

  return (
    <>
      <div className="py-2 px-4 w-40 flex justify-between bg-red-900 rounded-xl text-white">
        <div> Buyturn:</div>
        <select
          className="bg-transparent outline-none"
          value={sort_by}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="asc">Least</option>
          <option value="desc">Most </option>
        </select>
      </div>
      <div className="flex gap-4 justify-between">
        <div className="relative overflow-x-auto sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-white table-fixed">
            <thead className="text-xs text-white uppercase bg-red-900 ">
              <tr>
                <th scope="col" className="px-6 py-3 w-28">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone number
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-center w-24">
                  Buyturn
                </th>
              </tr>
            </thead>
            <tbody className="text-red-900">
              {listUsers?.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-3">{user.user_id}</td>
                  <td className="px-6 py-3">{user.username || "NULL"}</td>
                  <td className="px-6 py-3">{user.fullname || "NULL"}</td>
                  <td className="px-6 py-3">{user.phonenumber || "NULL"}</td>
                  <td className="px-6 py-3">{user.address || "NULL"}</td>
                  <td className="px-6 py-3 text-center">{user.buyturn || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
