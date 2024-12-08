import { useEffect, useState } from "react";
import { HiClock } from "react-icons/hi";
export default function CountDownTime() {
  const [hourTime, setHourTime] = useState("00");
  const [minuteTime, setMinuteTime] = useState("00");
  const [secondTime, setSecondTime] = useState("00");
  useEffect(() => {
    const countDownDate = new Date("December 01, 2024 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setHourTime("00");
        setMinuteTime("00");
        setSecondTime("00");
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setHourTime(hours.toString().padStart(2, "0"));
        setMinuteTime(minutes.toString().padStart(2, "0"));
        setSecondTime(seconds.toString().padStart(2, "0"));
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="w-[10rem] max-sm:w-44 py-2 max-sm:text-lg rounded-xl text-red-900 font-extrabold bg-yellow-400 flex justify-center items-center gap-2">
      <HiClock className="size-5 max-sm:size-6 font-extrabold" />
      <div className=" font-bold flex justify-center items-center ">
        {hourTime}
      </div>
      :
      <div className=" font-bold flex justify-center items-center ">
        {minuteTime}
      </div>
      :
      <div className=" font-bold flex justify-center items-center ">
        {secondTime}
      </div>
    </div>
  );
}
