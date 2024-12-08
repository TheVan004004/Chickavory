import React from "react";
import Advertises from "../components/news/Advertises";
import Search from "../components/home/Search";
import OptionMenu from "../components/home/OptionMenu";
import Menu from "../components/home/Menu";

export default function Home() {
  return (
    <div className="pt-24 pb-8 mx-16 flex flex-col gap-6">
      <Search />
      <OptionMenu />
      <Menu />
    </div>
  );
}
