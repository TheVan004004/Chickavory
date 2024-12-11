import React from "react";
import { HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";
export default function ProductAdmin({
  product,
  index,
  setListProductsCache,
  isEdit,
}) {
  const onChangeDataInCache = (newProduct) => {
    console.log(newProduct.name);
    setListProductsCache((prev) => {
      const newList = [...prev];
      newList[index] = {
        ...newProduct,
      };
      return newList;
    });
  };
  const toogleStateProductInCache = () => {
    setListProductsCache((prev) => {
      const newList = [...prev];
      if (newList[index]?.status === "delete") {
        newList[index] = {
          ...prev[index],
          status: undefined,
        };
        return newList;
      }

      newList[index] = {
        ...prev[index],
        status: "delete",
      };
      return newList;
    });
  };
  return (
    <tr
      className={
        " border-b  text-red-950 " +
        (isEdit ? "bg-white" : "bg-yellow-50") +
        (product?.status === "delete" ? "bg-red-300" : "")
      }
    >
      <td className="px-6 py-4 font-bold">
        <input
          className="outline-none bg-inherit"
          value={product.name}
          onChange={(e) => {
            console.log("event", e.target.value);
            onChangeDataInCache({
              ...product,
              name: e.target.value,
            });
          }}
          disabled={!isEdit}
        ></input>
      </td>
      <td className="px-6 py-4">{product.category_name}</td>
      <td className="px-6 py-4 flex items-center justify-between">
        <div> anh san pham.png</div>
        <HiOutlineUpload className="size-6 text-gray-400 hover:text-black" />
      </td>
      <td className="px-6 py-4">{product.buyturn}</td>
      <td className="px-6 py-4">
        {" "}
        <input
          className="outline-none bg-inherit"
          value={product.price}
          onChange={(e) =>
            onChangeDataInCache({
              ...product,
              price: e.target.value,
            })
          }
          disabled={!isEdit}
        ></input>
      </td>
      <td className="px-6 py-4">
        <select
          className="outline-none bg-inherit"
          value={product.discount}
          onChange={(e) =>
            onChangeDataInCache({
              ...product,
              discount: e.target.value,
            })
          }
          disabled={!isEdit}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
        </select>
      </td>
      <td className="px-6 py-4 ">
        <HiOutlineTrash
          className="size-6 hover:text-red-500"
          onClick={() => {
            if (isEdit) {
              toogleStateProductInCache();
            }
          }}
        />
      </td>
    </tr>
  );
}
