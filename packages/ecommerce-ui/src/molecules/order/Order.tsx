import React, { useState, useEffect } from "react";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import Link from "next/link";
import { Button } from "../../atoms/button/Button";
import DeliveryOptions from '../../../../checkout-flow/src/components/DeliveryOptions';
import { useRouter } from 'next/router';
import { clearPreviewData } from "next/dist/server/api-utils";

interface OrderProps {
  shippingMethods?: any;
  billingData?: any;
  cartData: any; // Ajouter cartData comme une nouvelle propriété optionnelle
  setSelectedShippingMethod?: any;
  selectedShippingMethod?: any;
}

export const Order = ({ billingData, cartData, shippingMethods, setSelectedShippingMethod, selectedShippingMethod }: OrderProps) => {
  const router = useRouter();

  const handleShippingChange = (methodId: string) => {
    setSelectedShippingMethod(methodId);
  };

  const calculateTotal = () => {
    if (selectedShippingMethod === 'free_shipping' || selectedShippingMethod === 'local_pickup') {
      return billingData?.subtotal ? convertPrice(billingData?.subtotal) : " $00.00 ";
    }
    return billingData?.total ? convertPrice(billingData?.total) : " $00.00 ";
  };
  const convertPrice = (price: string) => {
    const finalPrice = parseFloat(price).toFixed(2);
    return finalPrice;
  };

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
            ShippingMethod={shippingMethods}
            shippingTotal={billingData.shipping_total}
            onShippingChange={handleShippingChange} // Ajout de la callback
            cartData={cartData}
            updateCart
            selectedShippingMethod={selectedShippingMethod}

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
          {calculateTotal()}
          {/*billingData?.total ? convertPrice(billingData?.total) : " $00.00 "*/}
          {/*totalWithShipping ? `$${convertPrice(totalWithShipping.toString())}` : billingData?.subtotal ? convertPrice(billingData?.subtotal) : " $00.00 "*/}

        </BodyText>
      </div>
      <Link href="/checkout">
        <Button className="w-full mt-6 text-lg font-semibold" color="primary" type="lg">
          Proceed To Checkout
        </Button>
      </Link>
    </div>
  );
};