import React from "react";
import { BiMinus } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";

interface CartCountProps {
  data?: any;
  onUpdateCartItem?: any;
}

export const CartCount = ({ data, onUpdateCartItem }: CartCountProps) => {
  const [value, setValue] = React.useState(data?.quantity?.value);
  const handleCartIncrease = () => {
    setValue(value + 1);
    onUpdateCartItem(data?.item_key, value+1);
  };
  const handleCartDecrease = () => {
    setValue(value - 1);
    onUpdateCartItem(data?.item_key, value-1);
  };
  return (
    <div className="flex items-center justify-center h-10 border w-28 border-themeSecondary300 rounded-3xl">
      <button disabled={value==1} onClick={handleCartDecrease} className="pr-2 text-lg text-themeSecondary400">
        <BiMinus />
      </button>
      <input
        className="w-8 text-base font-medium text-center focus:outline-none text-themeSecondary800"
        value={value}
        readOnly
        type="text"
      />
      <button onClick={handleCartIncrease} className="pl-2 text-lg text-themeSecondary400">
        <BiPlus />
      </button>
    </div>
  );
};
