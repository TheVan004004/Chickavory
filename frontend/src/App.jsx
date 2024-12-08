import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import NavBottom from "./components/NavBottom";
import { Outlet } from "react-router";
import NavLeft from "./components/NavLeft";
import ModalUser from "./components/ModalUser";
import NavRight from "./components/NavRight";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <NavBottom />
      <ModalUser />
      {/* <NavLeft /> */}
      <NavRight />
    </>
  );
}
