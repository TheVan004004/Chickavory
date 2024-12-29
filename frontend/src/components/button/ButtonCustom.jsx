export default function ButtonCustom({ type, className, children, ...props }) {
  const baseClass =
    "inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0 motion-reduce:transition-none";
  const typeClasses = {
    primary:
      "bg-primary shadow-primary-3 hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 active:bg-primary-600",
    dashed:
      "border-dashed border-[2px] bg-primary hover:bg-primary-accent-300 focus:bg-primary-accent-300 active:bg-primary-600",
    default:
      "bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-700",
  };

  return (
    <button
      className={clsx(baseClass, typeClasses[type], className)}
      {...props}
    >
      {children}
    </button>
  );
}
