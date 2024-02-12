import React from "react";
import { Order, CartItems } from "@jstemplate/ecommerce-ui";
import { removeCartItemHandler, updateCartItemHandler } from "../../utils/cart.utils";
import { useToasts } from "react-toast-notifications";
interface CartLayoutProps {
  cartData?: any;
  billingData?: any;
  shippingMethods: any;  // Ajoutez cette ligne pour les méthodes de livraison
  updateCart?: any;
  setSelectedShippingMethod?: any;
  selectedShippingMethod?: any;
  cart?: any;
}
const CartLayout = ({ cartData, billingData, shippingMethods, updateCart, cart, setSelectedShippingMethod, selectedShippingMethod }: CartLayoutProps) => {
  // const { addToast } = useToasts();
  const [itemRemoveLoading, setItemRemoveLoading] = React.useState(false);
  const [itemUpdateLoading, setItemUpdateLoading] = React.useState(false);

  /* const productToast = (message: string, type: any) => {
     addToast(`${message}`, {
       appearance: type,
       autoDismiss: true,
     });
   };*/

  const onRemoveCartItem = async (itemKey: string) => {
    await removeCartItemHandler(itemKey, setItemRemoveLoading);
    updateCart; // Assurez-vous que cette fonction rafraîchit les données du panier depuis le serveur
  };
  const onUpdateCartItem = async (itemKey: string, count: number) => {
    await updateCartItemHandler(itemKey, count, setItemUpdateLoading);
    updateCart; // Idem
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 mx-auto gap-7">
      <div className="lg:col-span-8">

        <CartItems cart={cart} cartData={cartData} onRemoveCartItem={onRemoveCartItem} onUpdateCartItem={onUpdateCartItem} />
      </div>
      <div className="lg:col-span-4">
        <Order setSelectedShippingMethod={setSelectedShippingMethod} // Fonction du contexte
          selectedShippingMethod={selectedShippingMethod} shippingMethods={shippingMethods} billingData={billingData} cartData={cartData} /> {/* Ajout de cartData comme prop */}
      </div>
    </div>
  );
};
export default CartLayout;