import { BodyText, Placeholder } from "@jstemplate/ecommerce-ui";
import Link from "next/link";
import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Skeleton from "react-loading-skeleton";

interface CategorySubMenuProps {
  category?: any;
  setOpen?: any;
}
const CategorySubMenu = ({ category, setOpen }: CategorySubMenuProps) => {
  return (
    <nav>
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center justify-between px-6">
          <BodyText size="lg" intent="semibold" className=" text-themeSecondary800">
            All Categories
          </BodyText>
          <RxCross2
            className=" text-themeSecondary400 font-bold text-xl cursor-pointer transition hover:text-themePrimary600  hover:duration-700"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
      <div className=" mt-4 border border-themeSecondary100"> </div>
      <div className="mt-8 px-6">
        {category?.map((singleData: any, index: number) => (
          <Link href={`/product-category/${singleData.id}`} key={index} onClick={() => setOpen(!open)}>
            <div>
              <div className=" flex items-center justify-between mb-5 cursor-pointer text-themeSecondary700 hover:text-themePrimary600 transition hover:duration-700">
                <div className=" flex items-center gap-4">
                  {singleData?.image ? (
                    <Placeholder src={singleData.image} imageHeight={20} imageWidth={20} />
                  ) : (
                    <Skeleton width={20} height={20} />
                  )}
                  <BodyText size="sm" className="themeSecondary700">
                    {singleData.name}
                  </BodyText>
                </div>
                <AiOutlineDown className="text-base" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default CategorySubMenu;
