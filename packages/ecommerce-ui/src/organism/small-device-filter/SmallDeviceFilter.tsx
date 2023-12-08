import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { BodyText } from '../../atoms/typography/bodyText/BodyText';
import { FilterWithOnlyRadio } from '../../molecules/filter/FilterWithOnlyRadio';
import { FilterWithRadio } from '../../molecules/filter/FilterWithRadio';
import { FilterWithRating } from '../../molecules/filter/FilterWithRating';
import { FilterWithSlider } from '../../molecules/filter/FilterWithSlider';
import { FilterWithText } from '../../molecules/filter/FilterWithText';


interface SmallDeviceFilterProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  categorydata?: any;
}


export const SmallDeviceFilter = ({ open, setOpen, categorydata }: SmallDeviceFilterProps) => {
  return (
    <>
      <div className="block lg:hidden relative">
        <div
          className={`overflow-y-auto z-40 flex pt-5 top-0 flex-col  h-screen w-full max-w-[300px]  fixed bg-white duration-300 ease-in-out gap-2 md:gap-0 ${
            open ? "left-0" : "-left-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 mb-4">
            <BodyText size="lg" intent="semibold">
              Filter
            </BodyText>
            <RxCross2
              className=" text-themeSecondary400 font-bold text-xl cursor-pointer transition hover:text-themePrimary600  hover:duration-700"
              onClick={() => setOpen(!open)}
            />
          </div>
          <hr />
          <div className="grid gap-5 mt-7 px-6">
            <FilterWithText name="category" filterItems={categorydata} />
            <FilterWithRadio name="brands" filterItems={brandsItems} />
            <FilterWithOnlyRadio name="colors" filterItems={colors} />
            <FilterWithRating name="ratings" filterItems={ratings} />
            <FilterWithSlider name="price" />
          </div>
        </div>
      </div>
      {/* background overlay */}
      <div
        className={`lg:hidden fixed top-0 z-30 transition-all duration-500 ease-in-out  bg-[#868687] opacity-80 h-full w-full ${
          open ? "left-0" : "-left-full"
        }`}
        onClick={() => setOpen(false)}
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
    name: "Black",
  },
  {
    name: "Red",
  },
  {
    name: "Blue",
  },
  {
    name: "Green",
  },
  {
    name: "Yellow",
  },
  {
    name: "Pink",
  },
  {
    name: "Purple",
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
