import NavBottom from "./components/navbar/NavBottom";
import NavRight from "./components/navbar/NavRight";
import ModalUser from "./components/user/ModalUser";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer />
    </>
  );
}
