import React, { useState, useCallback } from "react"; // Import useCallback from react
import { BiMinus } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
const _ = require('lodash');
const { toast } = require('react-toastify');


interface CartCountProps {
  data?: any;
  onUpdateCartItem?: any;
  cart?: any;
  onChange?: any;
}

export const CartCount = ({ data, onUpdateCartItem, cart, onChange }: CartCountProps) => {
  const [value, setValue] = useState(data?.quantity?.value);

  // Calculer la quantité maximale disponible basée sur les données du panier
  const maxAvailableQuantity = data.quantity.max_purchase

  const handleCartIncrease = useCallback(() => {
    if (value < maxAvailableQuantity) {
      handleChange(value + 1);
    }
  }, [value, maxAvailableQuantity]);

  const handleCartDecrease = useCallback(() => {
    if (value > 1) {
      handleChange(value - 1);
    }
  }, [value]);

  const handleChange = useCallback((newQuantity: number) => {
    setValue(newQuantity);
    if (onChange) {
      onChange(data?.item_key, newQuantity); // Signal au parent qu'une modification a eu lieu
    }
  }, [onChange, data?.item_key]);
  // console.log(maxAvailableQuantity)
  return (
    <div className="flex items-center justify-between border w-28 border-themeSecondary300 rounded-3xl">
      <button disabled={value <= 1} onClick={handleCartDecrease} className="px-2 text-lg text-themeSecondary400">
        <BiMinus />
      </button>
      <input
        className="w-8 text-base font-medium text-center focus:outline-none text-themeSecondary800"
        value={value}
        readOnly
        type="text"
      />
      <button disabled={value >= maxAvailableQuantity} onClick={handleCartIncrease} className="px-2 text-lg text-themeSecondary400">
        <BiPlus />
      </button>
    </div>
  );
};