import React, { useEffect } from "react";
import { Order, CartItems } from "@jstemplate/ecommerce-ui";
import { removeCartItemHandler, updateCartItemHandler } from "../../utils/cart.utils";
import { useToasts } from "react-toast-notifications";
import AlmaWidget from "src/components/payment/AlmaWidget";

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
  const [amount, setAmount] = React.useState(0); // Initialisé à 0 et typé comme nombre
  /* const productToast = (message: string, type: any) => {
     addToast(`${message}`, {
       appearance: type,
       autoDismiss: true,
     });
   };*/
  useEffect(() => {
    // Assurez-vous que cart.sub_total est un nombre et mis à jour correctement
    if (cart && cart.subtotal) {
      setAmount(Number(cart.subtotal)); // Convertit en nombre si nécessaire
      // console.log('Mise à jour des données du cart:', cart.subtotal);
    }
  }, [cart]); // Utilisez cart comme dépendance pour réagir aux changements de cart

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
        <Order setSelectedShippingMethod={setSelectedShippingMethod}
          selectedShippingMethod={selectedShippingMethod} shippingMethods={shippingMethods} billingData={billingData} cartData={cartData} almaWidget={<AlmaWidget amount={amount} />}
        />

      </div>
    </div>
  );
};
export default CartLayout;