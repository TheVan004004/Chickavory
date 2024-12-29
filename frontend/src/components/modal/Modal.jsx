import { HiOutlineXCircle } from "react-icons/hi";
export default function Modal({ isOpenModal, setIsOpenModal, children }) {
  return (
    <>
      <div
        className={
          "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl transition-all duration-300 " +
          (isOpenModal ? "z-50 " : "translate-y-[-1000px]")
        }
      >
        {children}
        <HiOutlineXCircle
          className="absolute top-2 right-2 text-red-900 hover:scale-110 size-8 transition-all duration-300"
          onClick={() => setIsOpenModal(false)}
        />
      </div>
      <div
        className={
          "fixed top-0 left-0 w-full h-full transition-colors duration-500 " +
          (isOpenModal ? "bg-black/70 z-20" : "bg-transparent -z-10")
        }
        onClick={() => setIsOpenModal(false)}
      ></div>
    </>
  );
}
