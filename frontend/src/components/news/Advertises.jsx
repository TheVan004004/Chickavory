import React, { useState } from "react";
import Ads1 from "../../assets/Advertises/Ads1.jpg";
import Ads2 from "../../assets/Advertises/Ads2.jpg";
import Ads3 from "../../assets/Advertises/Ads3.jpg";
import Ads4 from "../../assets/Advertises/Ads4.jpg";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
export default function Advertises() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listAds = [Ads1, Ads2, Ads3, Ads4];
  const toNext = () => {
    setCurrentIndex((index) => {
      if (index === listAds.length - 1) return 0;
      else return index + 1;
    });
  };
  const toPrev = () => {
    setCurrentIndex((index) => {
      if (index === 0) return listAds.length - 1;
      else return index - 1;
    });
  };

  return (
    <div className="box-content w-full h-auto overflow-hidden z-0 relative">
      <div
        className="flex flex-nowrap transition-all duration-500"
        style={{
          translate: `-${100 * currentIndex}%`,
        }}
      >
        {listAds.map((ads, index) => {
          return (
            <div
              className="w-full flex-grow-0 flex-shrink-0"
              key={`banner_${index}`}
            >
              <img src={ads} alt="" />
            </div>
          );
        })}
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-between text-white">
        <button onClick={toPrev} className="px-2 ">
          <HiChevronLeft className="size-12" />
        </button>
        <button onClick={toNext} className="px-2">
          <HiChevronRight className="size-12" />
        </button>
      </div>
      <div className="absolute bottom-2 left-0 w-full flex justify-center gap-3 items-center">
        {listAds.map((_, index) => {
          return (
            <button
              className={
                "rounded-full bg-white " +
                (index === currentIndex ? "h-4 w-4" : "h-3 w-3 opacity-50")
              }
              key={"banner_position_" + index}
              onClick={() => {
                setCurrentIndex(index);
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
