import React from 'react';
import { Order } from '../../molecules/order/Order';
import { CartItems } from '../../molecules/cart/CartItems';

interface CartLayoutProps {
  cartData?: any;
}
export const CartLayout = ({ cartData }: CartLayoutProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 mx-auto gap-7">
      <div className="lg:col-span-8">
        <CartItems cartData={cartData} />
      </div>
      <div className="lg:col-span-4">
        <Order />
      </div>
    </div>
  );
};
