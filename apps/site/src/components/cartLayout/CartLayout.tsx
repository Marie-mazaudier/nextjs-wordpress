import React from "react";
import { Order, CartItems } from "@jstemplate/ecommerce-ui";
import { removeCartItemHandler, updateCartItemHandler } from "../../utils/cart.utils";
import { useToasts } from "react-toast-notifications";

interface CartLayoutProps {
  cartData?: any;
  billingData?: any;
}
const CartLayout = ({ cartData, billingData }: CartLayoutProps) => {
  const { addToast } = useToasts();
  const [itemRemoveLoading, setItemRemoveLoading] = React.useState(false);
  const [itemUpdateLoading, setItemUpdateLoading] = React.useState(false);

  const productToast = (message: string, type: any) => {
    addToast(`${message}`, {
      appearance: type,
      autoDismiss: true,
    });
  };

  const onRemoveCartItem = (itemKey: string) => {
    removeCartItemHandler(itemKey, productToast, setItemRemoveLoading);
  };
  const onUpdateCartItem = (itemKey: string, count: number) => {
    updateCartItemHandler(itemKey, count, productToast, setItemUpdateLoading);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 mx-auto gap-7">
      <div className="lg:col-span-8">

        <CartItems cartData={cartData} onRemoveCartItem={onRemoveCartItem} onUpdateCartItem={onUpdateCartItem} />
      </div>
      <div className="lg:col-span-4">
        <Order billingData={billingData} cartData={cartData} /> {/* Ajout de cartData comme prop */}
      </div>
    </div>
  );
};
export default CartLayout;
