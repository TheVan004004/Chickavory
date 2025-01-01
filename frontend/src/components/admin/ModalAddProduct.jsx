import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { toast } from "react-toastify";
import useMainContext from "../../hooks/useMainContext";
import { addNewProductAPI } from "../../services/product.api";
import { isImagePNG, isPrice, validateForm } from "../../validation";
export default function ModalAddProduct({
  isOpenModalProduct,
  setIsOpenModalProduct,
}) {
  const { categories } = useMainContext();
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [category, setCategory] = useState("CK");
  const [error, setError] = useState("");

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setImage(null);
      setPreview("");
      return;
    }

    const file = event.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const addNewProuduct = async () => {
    const form = [
      { value: name, validates: [] },
      { value: price, validates: [{ function: isPrice, check: 1000 }] },
      { value: image, validates: [{ function: isImagePNG, check: "" }] },
    ];
    const listError = validateForm(form);
    setError((prev) => {
      let errorReturn = "";
      listError.forEach((error) => {
        errorReturn += error;
      });
      return errorReturn;
    });
    if (listError.size > 0) {
      return;
    }
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("sale_id", discount / 10);
    formData.set("category_id", category);
    formData.set("image", image);

    try {
      const res = await addNewProductAPI(formData);
      if (!res || !res.data) {
        console.error("API response is invalid:", res);
        toast.error("Something went wrong. Please try again.");
        return;
      }
      setIsOpenModalProduct(false);
      toast.success("Product added successfully:");
    } catch (error) {
      toast.error("Error occurred:", error);
    }
  };
  return (
    <Modal
      isOpenModal={isOpenModalProduct}
      setIsOpenModal={setIsOpenModalProduct}
    >
      <div className="p-8 flex flex-col gap-4 justify-center">
        <h2 className="font-bold text-3xl">Add New Product</h2>
        <div className="grid grid-cols-2 gap-8 w-[50vw] max-md::grid-cols-1 max-md:w-[90vw] max-lg:w-[70vw]">
          <div className="">
            <label
              htmlFor="input-img"
              className="h-[420px] rounded-3xl border-4 border-red-900 border-dashed bg-red-50 flex justify-center items-center font-bold text-2xl"
            >
              {preview ? (
                <img
                  className="w-full h-full object-contain"
                  src={preview}
                ></img>
              ) : (
                <>Upload Image</>
              )}
            </label>
            <input
              id="input-img"
              type="file"
              className="hidden"
              onChange={(e) => handleOnChangeFile(e)}
            />
          </div>
          <div className="flex flex-col gap-8 justify-between">
            <div className="flex flex-col gap-2">
              <table className="table-auto  w-full">
                <thead className="hidden">
                  <tr className="bg-red-100">
                    <th className="border border-red-900 p-4 text-left font-bold text-xl">
                      Field
                    </th>
                    <th className="border border-red-900 p-4 text-left font-bold text-xl">
                      Input
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b-2 border-red-900 p-4 font-bold">
                      Product name:
                    </td>
                    <td className="border-b-2 border-red-900 p-4">
                      <input
                        className="w-full outline-none bg-transparent"
                        placeholder="product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b-2 border-red-900 p-4 font-bold">
                      Category:
                    </td>
                    <td className="border-b-2 border-red-900 p-4">
                      <select
                        className="outline-none bg-inherit w-full"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        {categories.map((category, index) => {
                          if (category.name !== "ALL") {
                            return (
                              <option value={category.id} key={index}>
                                {category.name}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b-2 border-red-900 p-4 font-bold">
                      Price (VND):
                    </td>
                    <td className="border-b-2 border-red-900 p-4">
                      <input
                        className="w-full outline-none bg-transparent"
                        placeholder="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b-2 border-red-900 p-4 font-bold">
                      Discount:
                    </td>
                    <td className="border-b-2 border-red-900 p-4">
                      <select
                        className="outline-none bg-inherit w-full"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                      >
                        <option value="0">None</option>
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
                  </tr>
                </tbody>
              </table>
              <div className="text-red-800">{error}</div>
            </div>

            <button
              className="py-4 bg-red-900 rounded-2xl text-xl text-white font-bold"
              onClick={addNewProuduct}
            >
              Add New Product
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
