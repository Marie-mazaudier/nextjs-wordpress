import React, { useState, useEffect } from "react";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import Link from "next/link";
import { Button } from "../../atoms/button/Button";
import DeliveryOptions from '../../../../checkout-flow/src/components/DeliveryOptions';
import { useFetchShippingMethods } from '../../../../../apps/site/lib/woocommerce/shippingUtils';
import { useRouter } from 'next/router';

interface OrderProps {
  billingData?: any;
  cartData?: any; // Ajouter cartData comme une nouvelle propriété optionnelle
  totalWithShipping?: number; // Rendu optionnel

}

export const Order = ({ billingData, cartData }: OrderProps) => {
  const router = useRouter();

  const {
    shippingMethodsInfo,
    selectedShippingMethod,
    setSelectedShippingMethod,
    selectedShippingMethodValue,
    setSelectedShippingMethodValue,
    totalWithShipping // Récupération du total avec frais de livraison
  } = useFetchShippingMethods(cartData, billingData);

  const convertPrice = (price: string) => {
    const finalPrice = parseFloat(price).toFixed(2);
    return finalPrice;
  };


  const handleProceedToCheckout = () => {
    // Utilisez selectedShippingMethodValue directement si c'est '-1'
    const shippingMethodId = selectedShippingMethodValue === "-1"
      ? selectedShippingMethodValue
      : selectedShippingMethod?.id;

    if (shippingMethodId !== undefined) {
      router.push(`/checkout?shippingMethod=${shippingMethodId}`);
    } else {
      console.error('Aucune méthode de livraison sélectionnée');
      // Gérer l'erreur si aucune méthode de livraison n'est sélectionnée
    }
  };

  console.log('billing Data', billingData)
  console.log('panier', totalWithShipping)
  // Mise à jour du total avec les frais de livraison
  /* useEffect(() => {
     let shippingCost = 0;
     if (selectedShippingMethod) {
       shippingCost = selectedShippingMethod.price;
     }
     const subtotal = billingData?.subtotal ? parseFloat(billingData.subtotal) : 0;
     setTotalWithShipping(subtotal + shippingCost);
   }, [selectedShippingMethod, billingData?.subtotal, selectedShippingMethodValue]);
 
*/
  return (
    <div className="rounded-3xl bg-themeSecondary100 p-4 sm:p-7">
      <BodyText intent="medium" size="xl" className="capitalize text-themeSecondary800">
        Order Summary
      </BodyText>
      <div className="flex items-center gap-5 sm:gap-10 md:gap-40   lg:gap-7 px-3 sm:px-6 py-5 mt-6 bg-white rounded-xl">
        <BodyText size="md" className="capitalize text-themeSecondary800">
          Subtotal
        </BodyText>
        <BodyText size="md" className="capitalize text-themeSecondary800">
          {billingData?.subtotal ? convertPrice(billingData?.subtotal) : " $00.00 "}
        </BodyText>
      </div>
      <div className="flex items-center gap-5 sm:gap-10 md:gap-40   lg:gap-7 px-3 sm:px-6 py-5 mt-2 bg-white rounded-xl">
        <BodyText size="md" className="capitalize text-themeSecondary800">
          Shipping
        </BodyText>
        <div>
          {/* Affichage des options de livraison */}
          <DeliveryOptions
            shippingMethodsInfo={shippingMethodsInfo}
            selectedShippingMethod={selectedShippingMethod}
            setSelectedShippingMethod={setSelectedShippingMethod}
            selectedShippingMethodValue={selectedShippingMethodValue}
            setSelectedShippingMethodValue={setSelectedShippingMethodValue}

          />
        </div>
      </div>
      {/* <div className="flex items-center gap-5 sm:gap-10 md:gap-40   lg:gap-20 px-3 sm:px-6 py-5 mt-2 bg-white rounded-xl">
        <BodyText size="md" className="capitalize text-themeSecondary800">
          Coupon
        </BodyText>
        <BodyText size="md" className="capitalize text-themeSuccess600">
          Applied -00%
        </BodyText>
      </div> */}
      <div className="flex items-center gap-10 sm:gap-14 md:gap-44   lg:gap-14 px-3 sm:px-6 py-5 mt-2 bg-white rounded-xl">
        <BodyText size="md" intent="bold" className="capitalize text-themeSecondary800">
          Total
        </BodyText>
        <BodyText size="md" intent="bold" className="capitalize text-themeSecondary800">

          {/*billingData?.subtotal ? convertPrice(billingData?.subtotal) : " $00.00 "*/}
          {totalWithShipping ? `$${convertPrice(totalWithShipping.toString())}` : billingData?.subtotal ? convertPrice(billingData?.subtotal) : " $00.00 "}

        </BodyText>
      </div>
      <Button onClick={handleProceedToCheckout} className="w-full mt-6 text-lg font-semibold" color="primary" type="lg">
        Proceed To Checkout
      </Button>
    </div>
  );
};
