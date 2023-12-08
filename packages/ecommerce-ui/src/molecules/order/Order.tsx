import React from "react";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import Link from "next/link";
import { Button } from "../../atoms/button/Button";

interface OrderProps {
  billingData?: any;
}

export const Order = ({ billingData }: OrderProps) => {
  const convertPrice = (price: string) => {
    const finalPrice = parseInt(price).toFixed(2);
    return finalPrice;
  };
  return (
    <div className="rounded-3xl bg-themeSecondary100 p-4 sm:p-7">
      <BodyText intent="medium" size="xl" className="capitalize text-themeSecondary800">
        Order Summary
      </BodyText>
      <div className="flex items-center gap-5 sm:gap-10 md:gap-40   lg:gap-20 px-3 sm:px-6 py-5 mt-6 bg-white rounded-xl">
        <BodyText size="md" className="capitalize text-themeSecondary800">
          Subtotal
        </BodyText>
        <BodyText size="md" className="capitalize text-themeSecondary800">
          {billingData?.subtotal ? convertPrice(billingData?.subtotal) : " $00.00 "}
        </BodyText>
      </div>
      <div className="flex items-center gap-5 sm:gap-10 md:gap-40   lg:gap-20 px-3 sm:px-6 py-5 mt-2 bg-white rounded-xl">
        <BodyText size="md" className="capitalize text-themeSecondary800">
          Shipping
        </BodyText>
        <BodyText size="md" className="capitalize text-themeSuccess600">
          Cash On Delivery
        </BodyText>
      </div>
      {/* <div className="flex items-center gap-5 sm:gap-10 md:gap-40   lg:gap-20 px-3 sm:px-6 py-5 mt-2 bg-white rounded-xl">
        <BodyText size="md" className="capitalize text-themeSecondary800">
          Coupon
        </BodyText>
        <BodyText size="md" className="capitalize text-themeSuccess600">
          Applied -00%
        </BodyText>
      </div> */}
      <div className="flex items-center gap-10 sm:gap-14 md:gap-44   lg:gap-24 px-3 sm:px-6 py-5 mt-2 bg-white rounded-xl">
        <BodyText size="md" intent="bold" className="capitalize text-themeSecondary800">
          Total
        </BodyText>
        <BodyText size="md" intent="bold" className="capitalize text-themeSecondary800">
          {billingData?.subtotal ? convertPrice(billingData?.subtotal) : " $00.00 "}
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
