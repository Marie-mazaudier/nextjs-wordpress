import { Heading2 } from "@jstemplate/ecommerce-ui";
import React from "react";

interface EmptyDataFoundProps {
  message?: string;
}
export const EmptyDataFound = ({ message = "No Products Available" }: EmptyDataFoundProps) => {
  return <Heading2 className=" w-full  text-themePrimary600 h-40 flex items-center justify-center">{message}</Heading2>;
};
