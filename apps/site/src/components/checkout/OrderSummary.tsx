import React from "react";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { BodyText, Button, HorizontalLine } from "@jstemplate/ecommerce-ui";
import { FormLoader, Loader } from "../formLoader/FormLoader";

interface OrderSummaryProps {
  cartData: any;
  billingData: any;
  createOrder: any;
  orderLoading?: boolean
  isPoliciesAgreed: boolean
  handleAgreementChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const OrderSummary = ({ cartData, billingData, createOrder, orderLoading, isPoliciesAgreed, handleAgreementChange }: OrderSummaryProps) => {
  return (
    <div className="w-full lg:col-span-4 h-fit bg-white rounded-2xl pb-6">
      {/* Title */}
      <BodyText
        size="xl"
        intent="medium"
        className="m-2.5 p-2.5 bg-themeSecondary100 rounded-xl text-themeSecondary800"
      >
        Order Summary
      </BodyText>
      {/* cart added products */}
      {cartData?.map((singleItem: any, index: number) => (
        <div key={index} className="flex items-center mx-5 gap-2.5 md:gap-6 border-b py-5">
          <Image
            className="rounded"
            src={singleItem?.featured_image}
            width={70}
            height={70}
            alt="card-item-image"
            priority={true}
          />
          <div>
            <Link href={`/produit/${singleItem?.slug}`}>
              <BodyText
                size="md"
                intent="medium"
                className="text-themeSecondary600 line-clamp-2 hover:text-themePrimary600 transition hover:duration-700"
              >
                {singleItem?.title}
              </BodyText>
            </Link>
            <div className="flex flex-wrap items-center gap-2 sm:gap-5 mt-1">
              <BodyText size="md" intent="medium" className="text-themeSecondary500">
                Quantity: {singleItem?.quantity?.value}
              </BodyText>
              <BodyText size="md" intent="bold" className="text-themeSecondary800">
                ${(singleItem?.totals?.total).toFixed(2)}
              </BodyText>
            </div>
          </div>
        </div>
      ))}
      <HorizontalLine />
      <div className="flex items-center justify-between gap-3 my-7 mx-5">
        <div className="space-y-2.5">
          <BodyText size="md" intent="medium" className="text-themeSecondary600">
            Subtotal
          </BodyText>
          <BodyText size="md" intent="medium" className="text-themeSecondary600">
            Shipping Fee
          </BodyText>
          <BodyText size="xl" intent="bold" className="text-themeSecondary800">
            Total
          </BodyText>
        </div>
        <div className="space-y-2.5 text-right">
          {billingData?.cart_contents_total ? (
            <BodyText size="md" intent="bold" className="text-themeSecondary800">
              ${parseInt(billingData?.cart_contents_total).toFixed(2)}
            </BodyText>
          ) : (
            <div className="space-y-2.5">
              $<Skeleton width={40} height={20} />
            </div>
          )}
          {billingData?.shipping_total ? (
            <BodyText size="md" intent="bold" className="text-themeSecondary800">
              ${parseInt(billingData?.shipping_total).toFixed(2)}
            </BodyText>
          ) : (
            <div className="space-y-2.5">
              $<Skeleton width={40} height={20} />
            </div>
          )}
          {billingData?.total ? (
            <BodyText size="xl" intent="bold" className="text-themeSecondary800">
              ${billingData?.total}
            </BodyText>
          ) : (
            <div className="space-y-2.5">
              $<Skeleton width={40} height={20} />
            </div>
          )}
        </div>
      </div>
      <HorizontalLine />
      {/* checkout button */}
      <div className="mx-5 my-7">
        <div className="flex items-center gap-3">
          <input id="notify" type="checkbox" className="w-5 h-5 accent-themePrimary600 shrink-0" />
          <label htmlFor="notify" className="text-themeSecondary600 text-base">
            Sign me up to receive email updates and news (optional)
          </label>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <input checked={isPoliciesAgreed}
            onChange={handleAgreementChange} id="police" type="checkbox" className="w-5 h-5 accent-themePrimary600 shrink-0" />
          <label htmlFor="police" className="text-themeSecondary600 text-base">
            I agree with the{" "}
            <Link href="/">
              <span className="text-themePrimary600 font-bold">Meta-Shop Policies</span>
            </Link>
          </label>
        </div>
        <div onClick={createOrder}>
          <Button className={`flex items-center justify-center gap-2 mt-7 w-full text-lg font-semibold ${orderLoading && 'bg-themeSecondary800'
            }`}>{orderLoading && <FormLoader />}Continue</Button>
        </div>
      </div>
    </div>
  );
};
