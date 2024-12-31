import { HiOutlineXCircle } from "react-icons/hi";
export default function Modal({ isOpenModal, setIsOpenModal, children }) {
  return (
    <>
      <div
        className={
          "fixed top-[50%] left-[50%] translate-x-[-50%] transition-all bg-white rounded-2xl  duration-500 " +
          (isOpenModal
            ? " translate-y-[-50%] z-50  opacity-100"
            : " translate-y-[-1000px] opacity-0")
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
          (isOpenModal
            ? "bg-black/70 z-20"
            : "bg-transparent -z-20 transition-none")
        }
        onClick={() => setIsOpenModal(false)}
      ></div>
    </>
  );
}
