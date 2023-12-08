import React from "react";
import {
  FilterWithText,
  FilterWithOnlyRadio,
  FilterWithSlider,
  BodyText,
} from "@jstemplate/ecommerce-ui";
import { RxCross2 } from "react-icons/rx";

interface ProductFilterProps {
  filterOpen?: boolean;
  // setFilterOpen?: (value: boolean) => void;
  setFilterOpen?: any;
  categorydata?: any;
  setPriceRange?: (value: any) => void;
  colorAttributeData?: any;
  setColorAttribute?: (value: any) => void;
}

export const ProductFilter = ({
  filterOpen,
  setFilterOpen,
  categorydata,
  setPriceRange,
  colorAttributeData,
  setColorAttribute,
}: ProductFilterProps) => {
  return (
    <>
      {/* large device design */}
      <div className="w-full hidden lg:block lg:w-3/12 space-y-7">
        <FilterWithText name="category" filterItems={categorydata} />
        {/* <FilterWithRadio name="brands" filterItems={brandsItems} /> */}
        <FilterWithOnlyRadio name="colors" filterItems={colorAttributeData} seValue={setColorAttribute} />
        {/* <FilterWithRating name="ratings" filterItems={ratings} /> */}
        <FilterWithSlider name="price" setPriceRange={setPriceRange} />
      </div>
      {/* small device design */}
      <div className="block lg:hidden relative">
        <div
          className={`overflow-y-auto z-40 flex pt-5 top-0 flex-col  h-screen w-full max-w-[300px]  fixed bg-white duration-300 ease-in-out gap-2 md:gap-0 ${
            filterOpen ? "left-0" : "-left-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 mb-4">
            <BodyText size="lg" intent="semibold">
              Filter
            </BodyText>
            <RxCross2
              className=" text-themeSecondary400 font-bold text-xl cursor-pointer transition hover:text-themePrimary600  hover:duration-700"
              onClick={() => setFilterOpen(!filterOpen)}
            />
          </div>
          <hr />
          <div className="grid gap-5 mt-7 px-6">
            <FilterWithText name="category" filterItems={categorydata} />
            {/* <FilterWithRadio name="brands" filterItems={brandsItems} /> */}
            <FilterWithOnlyRadio name="colors" filterItems={colorAttributeData} seValue={setColorAttribute} />
            {/* <FilterWithRating name="ratings" filterItems={ratings} /> */}
            <FilterWithSlider name="price" setPriceRange={setPriceRange} />
          </div>
        </div>
      </div>
      {/* background overlay */}
      <div
        className={`lg:hidden fixed top-0 z-30 transition-all duration-500 ease-in-out  bg-[#868687] opacity-80 h-full w-full ${
          filterOpen ? "left-0" : "-left-full"
        }`}
        onClick={() => setFilterOpen(false)}
      />
    </>
  );
};

const brandsItems = [
  {
    name: "Dell",
  },
  {
    name: "Apple",
  },
  {
    name: "Samsung",
  },
  {
    name: "HP",
  },
  {
    name: "Lenovo",
  },
];

const cateogryItems = [
  {
    name: "Mens Fashion",
  },
  {
    name: "Womens Fashion",
  },
  {
    name: "Health & Beauty",
  },
  {
    name: "Electronic Accessories",
  },
  {
    name: "Home Appliances",
  },
  {
    name: "Furniture",
  },
  {
    name: "Gifts & Hobbies",
  },
  {
    name: "Home & Lifestyle",
  },
  {
    name: "Toys, Kids & Babies",
  },
  {
    name: "Automotive & Motorbike",
  },
  {
    name: "Sports & Outdoor",
  },
  {
    name: "Groceries & Daily Needs",
  },
  {
    name: "Others",
  },
];

const colors = [
  {
    name: "black",
    value: 11,
  },
  {
    name: "red",
    colour: 12,
  },
  {
    name: "blue",
    colour: 13,
  },
  {
    name: "green",
    colour: 14,
  },
  {
    name: "yellow",
    colour: 15,
  },
  {
    name: "pink",
    colour: 16,
  },
  {
    name: "purple",
    colour: 17,
  },
];

const ratings = [
  {
    name: "5 stars",
    value: 5,
  },
  {
    name: "4 stars",
    value: 4,
  },
  {
    name: "3 stars",
    value: 3,
  },
  {
    name: "2 stars",
    value: 2,
  },
  {
    name: "1 star",
    value: 1,
  },
];
