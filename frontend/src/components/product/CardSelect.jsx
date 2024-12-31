import React from "react";
export default function CardSelect({
  category,
  categorySelected,
  setCategorySelected,
}) {
  const container =
    "relative flex-shrink-0 size-20 rounded-2xl outline-red-900 outline-2 outline flex justify-center items-center hover:scale-110 transition-transform duration-500 ";
  const text =
    "w-full h-full flex justify-center items-center font-bold text-xl text-red-900";
  return (
    <div
      className={
        categorySelected.id === category.id
          ? container + " outline-4 outline-red-400"
          : container
      }
      onClick={() => {
        setCategorySelected(category);
      }}
    >
      {categorySelected.id === category.id && (
        <div className="absolute top-0 left-0 w-full h-full bg-red-300 rounded-2xl opacity-20"></div>
      )}
      {category.image ? (
        <img
          src={category.image}
          className="w-full h-full object-contain rounded-2xl"
        />
      ) : (
        <div className={text}>{category.name}</div>
      )}
    </div>
  );
}
