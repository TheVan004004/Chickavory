import React, { useEffect, useState } from "react";
import ProductAdmin from "./ProductAdmin";
import {
  deleteProductAPI,
  getProductsAPI,
  updateProductAPI,
} from "../../services/product.api";
import ModalAddProduct from "./ModalAddProduct";

export default function ManageProducts() {
  const [listProducts, setListProducts] = useState([]);
  const [listProductsCache, setListProductsCache] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await getProductsAPI({
      category_id: "",
      sort_by: "",
      desc: "",
      name: "",
    });
    setListProducts(res.data);
    setListProductsCache(res.data);
  };
  const handleSave = async () => {
    setIsSaving(true);
    let isChange = false;
    try {
      for (let index = 0; index < listProductsCache.length; index++) {
        if (listProductsCache?.[index]?.status === "delete") {
          await deleteProductAPI(listProductsCache?.[index].id);
          isChange = true;
          continue;
        }
        if (
          listProductsCache?.[index].name !== listProducts?.[index].name ||
          listProductsCache?.[index].discount !==
            listProducts?.[index].discount ||
          listProductsCache?.[index].price !== listProducts?.[index].price
        ) {
          await updateProductAPI({
            product_id: listProductsCache?.[index].id,
            name: listProductsCache?.[index].name,
            price: listProductsCache?.[index].price,
            discount: listProductsCache?.[index].discount,
          });
          isChange = true;
        }
      }
      if (isChange) getProducts();
    } catch (e) {
      console.log(e);
    }

    setIsSaving(false);
    setIsEdit(false);
  };
  return (
    <>
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4">
          <button
            className="px-4 py-1 border-red-900 border-2 border-dashed rounded-xl text-red-900 font-medium"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
          <button
            className={
              "px-4 py-1 bg-red-900 border-red-900 border-2 rounded-xl text-white font-medium" +
              (isEdit ? "" : " cursor-not-allowed")
            }
            onClick={handleSave}
            disabled={!isEdit}
          >
            Save
          </button>
        </div>

        <button
          className="px-4 py-1 bg-red-900 border-red-900 border-2 rounded-xl text-white font-medium"
          onClick={() => setIsOpenModalProduct(true)}
        >
          Add product
        </button>
      </div>
      <div className="relative overflow-x-auto sm:rounded-lg ">
        <table
          className={
            "w-full text-sm text-left rtl:text-right text-white table-fixed overflow-scroll" +
            (isEdit ? "" : " cursor-not-allowed")
          }
        >
          <thead className="text-xs text-white uppercase bg-red-900 ">
            <tr>
              <th scope="col" className="px-6 py-3 w-80 truncate">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 w-36 truncate">
                Category
              </th>
              <th scope="col" className="px-6 py-3 w-32 text-center truncate">
                Buyturn
              </th>
              <th scope="col" className="px-6 py-3 w-32 truncate">
                Price
              </th>
              <th scope="col" className="px-6 py-3 w-36 truncate">
                Discount (%)
              </th>
              <th scope="col" className="px-6 py-3 w-36 text-center truncate">
                Sale price
              </th>
              <th scope="col" className="px-6 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody className="bg-red-400">
            {listProductsCache.map((product, index) => {
              return (
                <ProductAdmin
                  setListProductsCache={setListProductsCache}
                  isEdit={isEdit}
                  index={index}
                  product={product}
                  key={product.id}
                />
              );
            })}
          </tbody>
        </table>
        <div
          className={
            "fixed top-0 left-0 bg-black opacity-50 w-full h-full overflow-x-auto sm:rounded-lg z-10 flex flex-col gap-6 justify-center items-center " +
            (isSaving ? " flex" : " hidden")
          }
        >
          <svg
            aria-hidden="true"
            className="size-16 text-gray-200 animate-spin fill-red-900"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <p className="text-2xl text-white">Waiting for Update...</p>
        </div>
      </div>
      <ModalAddProduct
        isOpenModalProduct={isOpenModalProduct}
        setIsOpenModalProduct={setIsOpenModalProduct}
      />
    </>
  );
}
