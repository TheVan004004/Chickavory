import React, { useEffect, useState } from "react";
import ProductPurchased from "../product/ProductPurchased";
import Pagination from "../Pagination";
import { getPurchasedProductAPI } from "../../services/product.api";
import useMainContext from "../../hooks/useMainContext";
import { toast } from "react-toastify";

export default function History() {
  const { user } = useMainContext();
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    getPurchasedProduct();
  }, []);
  const getPurchasedProduct = async () => {
    try {
      const res = await getPurchasedProductAPI(user.id);
      setListProduct(res.data);
    } catch (e) {
      toast.error(e.response);
    }
  };
  return (
    <div className="flex flex-col gap-4 flex-grow-[3] p-4 shadow-md shadow-red-500/40 rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-shadow duration-500">
      <div className="font-semibold text-3xl flex-shrink-0">
        Purchased Product
      </div>
      <div className="flex-grow">
        <div className="w-full h-[450px] overflow-y-auto flex flex-col gap-2">
          {listProduct?.map((product) => (
            <ProductPurchased key={product.id} product={product} />
          ))}
        </div>
      </div>
      {/* <Pagination count={4} /> */}
    </div>
  );
}
