import React, { useEffect, useState } from "react";
import {
  getChartOrderStatusAPI,
  getYearlyOrderAPI,
  getYearlyRevenueAPI,
} from "../../../services/order.api";
import ChartStatusOrder from "./ChartStatusOrder";
import ChartProductSales from "./ChartProductSales";
import ChartProductOrder from "./ChartProductOrder";

export default function Overview() {
  const [dataChartStatusOrder, setDataChartStatusOrder] = useState([]);
  const [option, setOption] = useState("today");
  const [saleByMonth, setSaleByMonth] = useState([]);
  const [topMonth, setTopMonth] = useState(null);
  const [currentMonthSales, setCurrentMonthSales] = useState(0);
  const [OrderByMonth, setOrderByMonth] = useState([]);
  const [topBuyMonth, setTopBuyMonth] = useState(null);
  const [currentMonthOrder, setCurrentMonthOrder] = useState(0);
  useEffect(() => {
    getChartStatusOrder();
  }, [option]);
  useEffect(() => {
    getYearlyRevenue();
    getYearlyOrder();
  }, []);
  const getChartStatusOrder = async () => {
    try {
      const res = await getChartOrderStatusAPI(option);
      setDataChartStatusOrder(res.data);
    } catch (e) {}
  };
  const getYearlyOrder = async () => {
    const res = await getYearlyOrderAPI();
    const data = res.data.monthlyOrderCount.map((d, index) => ({
      x: index + 1,
      y: parseInt(d),
    }));
    console.log(data);
    setOrderByMonth(data);

    const maxSales = Math.max(...data.map((d) => d.y));
    const topMonthData = data.find((d) => d.y === maxSales);
    setTopBuyMonth(topMonthData);

    const currentMonth = new Date().getMonth() + 1;
    const currentMonthData = data.find((d) => d.x === currentMonth);
    setCurrentMonthOrder(currentMonthData ? currentMonthData.y : 0);
  };
  const getYearlyRevenue = async () => {
    try {
      const res = await getYearlyRevenueAPI();
      const data = res.data.monthlyRevenue.map((d, index) => ({
        x: index + 1,
        y: parseInt(d),
      }));
      setSaleByMonth(data);

      const maxSales = Math.max(...data.map((d) => d.y));
      const topMonthData = data.find((d) => d.y === maxSales);
      setTopMonth(topMonthData);

      const currentMonth = new Date().getMonth() + 1;
      const currentMonthData = data.find((d) => d.x === currentMonth);
      setCurrentMonthSales(currentMonthData ? currentMonthData.y : 0);
    } catch (e) {}
  };
  return (
    <div className="flex flex-col gap-5 *:text-red-950">
      <div
        className="p-5 grid gap-10 items-center shadow-sm shadow-red-400/50 rounded-xl"
        style={{
          gridTemplateColumns: "1fr 3fr",
        }}
      >
        <ChartStatusOrder data={dataChartStatusOrder} />
        <div className="flex flex-col gap-16">
          <div className="flex gap-32 items-center">
            <h2 className="font-bold text-2xl ">Status Order</h2>
            <div className="flex gap-2 px-4 py-2 bg-red-300 rounded-xl">
              <div>Time</div>
              <select
                className="bg-transparent outline-none"
                value={option}
                onChange={(e) => setOption(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          <div className="grid gap-5 grid-cols-3">
            {dataChartStatusOrder.length > 0 &&
              dataChartStatusOrder.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center shadow-sm shadow-red-400/50 rounded-xl p-4 rounded-lg"
                >
                  <b className="font-bold text-3xl text-red-400">
                    {data.order_count}
                  </b>
                  <p className="">{data.status}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div
        className="p-5 grid gap-10 items-center shadow-sm shadow-red-400/50 rounded-xl "
        style={{
          gridTemplateColumns: "3fr 1fr",
        }}
      >
        <h2 className="font-bold text-2xl ">Yearly Revenue</h2> <div></div>
        <ChartProductSales data={saleByMonth} />
        <div className="flex flex-col gap-8 p4">
          <div className="flex flex-col gap-2 justify-center">
            <div className="text-2xl font-bold">Top sale month: </div>
            <div className="text-xl text-red-600">
              {topMonth
                ? `${topMonth.y.toLocaleString("vi-VN")} VND`
                : "Loading..."}
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <div className="text-2xl font-bold">Current Revenue: </div>
            <div className="text-md text-red-400">
              {currentMonthSales
                ? `${currentMonthSales.toLocaleString("vi-VN")} VND`
                : "Loading..."}
            </div>
          </div>
        </div>
      </div>
      <div
        className="p-5 grid gap-10 items-center shadow-sm shadow-red-400/50 rounded-xl "
        style={{
          gridTemplateColumns: "3fr 1fr",
        }}
      >
        <h2 className="font-bold text-2xl ">Order monthly</h2> <div></div>
        <ChartProductOrder data={OrderByMonth} />
        <div className="flex flex-col gap-8 p4">
          <div className="flex flex-col gap-2 justify-center">
            <div className="text-2xl font-bold">Most order: </div>
            <div className="text-xl text-red-600">
              {topBuyMonth ? `${topBuyMonth.y} orders` : "Loading..."}
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center">
            <div className="text-2xl font-bold ">Current month: </div>
            <div className="text-md text-red-400">
              {currentMonthOrder ? `${currentMonthOrder} order` : "Loading..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
