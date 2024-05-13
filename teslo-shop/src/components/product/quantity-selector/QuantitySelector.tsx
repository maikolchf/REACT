"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  inStock: number;
  onQuantityChanged: (value: number) => void;
}

export const QuatitySelector = ({ quantity, inStock , onQuantityChanged }: Props) => {
  
  const onValueChanged = (value: number) => {
    console.log(value);
    if (quantity + value < 1) return;

    if ((quantity + value) > inStock) return;

    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
      </span>
      <button onClick={() => onValueChanged(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
