import React, { useEffect } from "react";
import { getChartOrderStatusAPI } from "../../services/order.api";

export default function Overview() {
  useEffect(() => {
    getChartStatusOrder();
  }, []);
  const getChartStatusOrder = async () => {
    try {
      const res = await getChartOrderStatusAPI();
      console.log(res.data);
    } catch (e) {}
  };
  return <div>Overview</div>;
}
