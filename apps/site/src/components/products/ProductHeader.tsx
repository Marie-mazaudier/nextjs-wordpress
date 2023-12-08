import React from "react";
import { BodyText, FilterDropDown } from "@jstemplate/ecommerce-ui";

interface BlogFilterProps {
  filterOpen?: boolean;
  setFilterOpen: (value: any) => void;
  productActive: number;
  setProductActive: (value: any) => void;
  setpage?: (value: any) => void;
  setSort?: (value: any) => void;
  totalProductShow?: any;
  totalProductCount?: any;
}

export const ProductHeader = ({
  filterOpen,
  setFilterOpen,
  productActive,
  setProductActive,
  setpage,
  setSort,
  totalProductShow,
  totalProductCount,
}: BlogFilterProps) => {
  return (
    <section className=" container mx-auto px-5 md:px-0">
      <div className="grid lg:flex gap-5  items-center lg:justify-between">
        <BodyText className="text-themeSecondary800 text-center" size="lg">
          {/* Showing 1-25 of 56 results */}
          Showing {totalProductShow || 0} of {totalProductCount || 0} results
        </BodyText>
        {/* large device */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            onClick={() => setFilterOpen(!filterOpen)}
            className="hidden sm:flex lg:hidden items-center gap-2.5 rounded-lg px-5 py-3 border border-themeSecondary300 cursor-pointer"
          >
            <BodyText className="text-themeSecondary600 text-center" size="md">
              Filter
            </BodyText>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.33333 10H9.66667V8.33333H6.33333V10ZM0.5 0V1.66667H15.5V0H0.5ZM3 5.83333H13V4.16667H3V5.83333Z"
                fill="#A1A1AA"
              />
            </svg>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex">
              <FilterDropDown options={showFilter} setpage={setpage} />
            </div>
            <div className="hidden sm:flex">
              <FilterDropDown options={sortFilter} setpage={setSort} />
            </div>
            <div
              className={` hidden sm:flex ${
                productActive === 0
                  ? "bg-themePrimary600 border border-themePrimary600"
                  : " border border-themeSecondary300"
              } rounded-lg p-4 cursor-pointer`}
              onClick={() => setProductActive(0)}
            >
              <svg
                className={`${productActive === 0 ? "text-white" : "text-themeSecondary600"}`}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 7V11H7V7H11ZM13 7H18V11H13V7ZM11 18H7V13H11V18ZM13 18V13H18V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H13ZM11 0V5H7V0H11ZM13 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1V5H13V0ZM5 7V11H0V7H5ZM5 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V13H5V18ZM5 0V5H0V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div
              className={`hidden sm:flex ${
                productActive === 1
                  ? "bg-themePrimary600 border border-themePrimary600"
                  : " border border-themeSecondary300"
              } rounded-lg p-4 cursor-pointer`}
              onClick={() => setProductActive(1)}
            >
              <svg
                className={`${productActive === 1 ? "text-white" : "text-themeSecondary600"}`}
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0H18V2H8V0ZM8 4H14V6H8V4ZM8 10H18V12H8V10ZM8 14H14V16H8V14ZM0 0H6V6H0V0ZM2 2V4H4V2H2ZM0 10H6V16H0V10ZM2 12V14H4V12H2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* small device */}
        <div className="sm:hidden flex items-center justify-between">
          <div
            className="flex items-center gap-2.5 rounded-lg px-5 py-3 border border-themeSecondary300 cursor-pointer"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <BodyText className="text-themeSecondary600 text-center" size="md">
              Filter
            </BodyText>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.33333 10H9.66667V8.33333H6.33333V10ZM0.5 0V1.66667H15.5V0H0.5ZM3 5.83333H13V4.16667H3V5.83333Z"
                fill="#A1A1AA"
              />
            </svg>
          </div>
          <FilterDropDown options={showFilter} setpage={setpage} />
        </div>
        <div className="sm:hidden flex flex-wrap gap-2.5 items-center justify-between">
          <FilterDropDown options={sortFilter} setpage={setSort} />
          <div className="flex items-center gap-3">
            <div
              className={`${
                productActive === 0
                  ? "bg-themePrimary600 border border-themePrimary600"
                  : " border border-themeSecondary300"
              } rounded-lg p-4 cursor-pointer`}
              onClick={() => setProductActive(0)}
            >
              <svg
                className={`${productActive === 0 ? "text-white" : "text-themeSecondary600"}`}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 7V11H7V7H11ZM13 7H18V11H13V7ZM11 18H7V13H11V18ZM13 18V13H18V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18H13ZM11 0V5H7V0H11ZM13 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1V5H13V0ZM5 7V11H0V7H5ZM5 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V13H5V18ZM5 0V5H0V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H5Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div
              className={`${
                productActive === 1
                  ? "bg-themePrimary600 border border-themePrimary600"
                  : " border border-themeSecondary300"
              } rounded-lg p-4 cursor-pointer`}
              onClick={() => setProductActive(1)}
            >
              <svg
                className={`${productActive === 1 ? "text-white" : "text-themeSecondary600"}`}
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0H18V2H8V0ZM8 4H14V6H8V4ZM8 10H18V12H8V10ZM8 14H14V16H8V14ZM0 0H6V6H0V0ZM2 2V4H4V2H2ZM0 10H6V16H0V10ZM2 12V14H4V12H2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const showFilter = [
  {
    name: "Show 1",
    value: 1,
  },
  {
    name: "Show 3",
    value: 3,
  },
  {
    name: "Show 5",
    value: 5,
  },
];
// const showFilter = [
//   {
//     name: "Show 12",
//     value: 12,
//   },
//   {
//     name: "Show 24",
//     value: 24,
//   },
//   {
//     name: "Show 36",
//     value: 36,
//   },
// ];

const sortFilter = [
  {
    name: "Default Sorting",
    value: "date",
  },
  {
    name: "average rating",
    value: "rating",
  },
  {
    name: "popularity",
    value: "popularity",
  },
];
// const sortFilter = [
//   {
//     name: "Default Sorting",
//     value: "default",
//   },
//   {
//     name: "average rating",
//     value: "rating",
//   },
//   {
//     name: "popularity",
//     value: "popularity",
//   },
// ];
