import React from "react";
import { Button } from "../../atoms/button/Button";
import { BodyText } from "../../atoms/typography/bodyText/BodyText";
import { Heading3 } from "../../atoms/typography/headingText/heading3";
import { RxCross2 } from "react-icons/rx";
import { Country } from "country-state-city";

// define interface as a type and use it in the component props
interface DashBoardProps {
  // billings props
  billingClickloading: boolean;
  handleBillingOnchange: (e: any) => void;
  handleBillingClick: any;
  billing: object | any;
  // shipping props
  shippingClickloading: boolean;
  handleShippingOnchange: (e: any) => void;
  handleShippingClick: any;
  shipping: object | any;
}

export const DashBoard = ({
  // billings props
  billingClickloading,
  handleBillingOnchange,
  handleBillingClick,
  billing,
  // shipping props
  shippingClickloading,
  handleShippingOnchange,
  handleShippingClick,
  shipping,
}: DashBoardProps) => {
  const [modal, setModal] = React.useState<number>(0);
  const [country, setCountry] = React.useState(Country.getAllCountries());
  return (
    <section>
      {/*************************  some Billing and Shipping Info **********************/}
      <div className="flex flex-col md:flex-row gap-5 md:gap-6 lg:gap-7">
        <div className="w-full md:w-1/2 p-7 border border-themeSecondary200 rounded-2xl">
          <div className=" flex items-center justify-between">
            <BodyText size="lg" intent="medium" className=" text-themeSecondary800 ">
              Billing Info
            </BodyText>
            <p onClick={() => setModal(1)} className="text-xs sm:text-sm text-themePrimary600 cursor-pointer">
              Edit
            </p>
          </div>
          <BodyText size="md" intent="medium" className=" mt-4 text-themeSecondary600 ">
            {`${billing?.first_name} ${billing?.last_name}`}
          </BodyText>
          <BodyText size="sm" className=" mt-2 text-themeSecondary500 ">
            {`${billing?.address_1}, ${billing?.address_2}`} <br />
            {`${billing?.state}, ${billing?.country}`}
          </BodyText>
          <BodyText size="sm" className=" mt-5 text-themeSecondary600 ">
            {`${billing?.email}`} <br />
            {`${billing?.phone}`}
          </BodyText>
        </div>
        <div className="w-full md:w-1/2 p-7 border border-themeSecondary200 rounded-2xl">
          <div className=" flex items-center justify-between">
            <BodyText size="lg" intent="medium" className=" text-themeSecondary800 ">
              Shipping Address
            </BodyText>
            <p onClick={() => setModal(2)} className="text-xs sm:text-sm text-themePrimary600 cursor-pointer">
              Edit
            </p>
          </div>
          <BodyText size="md" intent="medium" className=" mt-4 text-themeSecondary600 ">
            {`${shipping?.first_name} ${shipping?.last_name}`}
          </BodyText>
          <BodyText size="sm" className=" mt-2 text-themeSecondary500 ">
            {`${shipping?.address_1}, ${shipping?.address_2}`} <br />
            {`${shipping?.state}, ${shipping?.country}`}
          </BodyText>
          <BodyText size="sm" className=" mt-5 text-themeSecondary600 ">
            {`${shipping?.phone}`}
          </BodyText>
        </div>
      </div>
      {/*************************  overlay Billing Info edit modal   **********************/}
      <div className={`fixed inset-0 z-50 overflow-y-auto ${modal === 1 ? "block" : "hidden"}`}>
        <div onClick={() => setModal(0)} className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="absolute left-0 right-0 top-0 bottom-0 rounded-lg transform transition-all max-w-3xl w-full h-fit m-auto overflow-y-auto">
          <div className="bg-white p-4 w-full rounded-lg">
            <div className="flex items-center justify-between">
              <Heading3 intent="medium" className="text-themeSecondary800">
                Billing Info
              </Heading3>
              <div
                onClick={() => setModal(0)}
                className="flex items-center justify-center rounded-full w-7 h-7 cursor-pointer shadow-lg"
              >
                <RxCross2 />
              </div>
            </div>
            <form action="">
              <div className="space-y-2 sm:space-y-5 mt-6 w-full">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-5">
                  {" "}
                  <input
                    type="text"
                    placeholder="First Name"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="first_name"
                    value={billing?.first_name}
                    onChange={handleBillingOnchange}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="last_name"
                    value={billing?.last_name}
                    onChange={handleBillingOnchange}
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="company"
                    value={billing?.company}
                    onChange={handleBillingOnchange}
                  />
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-5">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="email"
                    value={billing?.email}
                    onChange={handleBillingOnchange}
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="phone"
                    value={billing?.phone}
                    onChange={handleBillingOnchange}
                  />

                  <select
                    title="country"
                    className="appearance-none border rounded-md w-full h-11 px-5 text-themeSecondary600 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline cursor-pointer svg_icon"
                    name="country"
                    value={billing.country}
                    onChange={handleBillingOnchange}
                  >
                    <option value="">{billing?.country === "" ? "Country" : billing?.country}</option>
                    {country.map((item, index) => (
                      <option key={index} value={item.isoCode}>
                        {item.flag} {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex  items-center gap-2 sm:gap-5">
                  <input
                    type="text"
                    placeholder="Street Address 1"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="address_1"
                    value={billing?.address_1}
                    onChange={handleBillingOnchange}
                  />
                  <input
                    type="text"
                    placeholder="Street Address 2"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="address_2"
                    value={billing?.address_2}
                    onChange={handleBillingOnchange}
                  />
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-5">
                  <input
                    type="text"
                    placeholder="State"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="state"
                    value={billing?.state}
                    onChange={handleBillingOnchange}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="city"
                    value={billing?.city}
                    onChange={handleBillingOnchange}
                  />
                  <input
                    type="text"
                    placeholder="Post Code"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="postcode"
                    value={billing?.postcode}
                    onChange={handleBillingOnchange}
                  />
                </div>
                <div onClick={handleBillingClick} className="w-fit">
                  <Button
                    size="md"
                    className={`flex items-center gap-2 ${billingClickloading && "bg-themeSecondary800"}`}
                  >
                    {billingClickloading && (
                      <svg
                        className={`ml-2 animate-spin h-5 w-5 text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    )}
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/*************************  overlay Shipping Address info edit modal   **********************/}
      <div className={`fixed inset-0 z-50 overflow-y-auto ${modal === 2 ? "block" : "hidden"}`}>
        <div onClick={() => setModal(0)} className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="absolute left-0 right-0 top-0 bottom-0 rounded-lg transform transition-all max-w-3xl w-full h-fit m-auto overflow-y-auto">
          <div className="bg-white p-4 w-full rounded-lg">
            <div className="flex items-center justify-between">
              <Heading3 intent="medium" className="text-themeSecondary800">
                Shipping Address
              </Heading3>
              <div
                onClick={() => setModal(0)}
                className="flex items-center justify-center rounded-full w-7 h-7 cursor-pointer shadow-lg"
              >
                <RxCross2 />
              </div>
            </div>
            <form action="">
              <div className="space-y-2 sm:space-y-5 mt-6 w-full">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-5">
                  {" "}
                  <input
                    type="text"
                    placeholder="First Name"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="first_name"
                    value={shipping?.first_name}
                    onChange={handleShippingOnchange}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="last_name"
                    value={shipping?.last_name}
                    onChange={handleShippingOnchange}
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="company"
                    value={shipping?.company}
                    onChange={handleShippingOnchange}
                  />
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-5">
                  <input
                    type="text"
                    placeholder="Phone"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="phone"
                    value={shipping?.phone}
                    onChange={handleShippingOnchange}
                  />
                  <select
                    title="country"
                    className="appearance-none border rounded-md w-full h-11 px-5 text-themeSecondary600 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline cursor-pointer svg_icon"
                    name="country"
                    value={shipping.country}
                    onChange={handleShippingOnchange}
                  >
                    <option value="">{shipping?.country === "" ? "Country" : shipping?.country}</option>
                    {country.map((item, index) => (
                      <option key={index} value={item.isoCode}>
                        {item.flag} {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex  items-center gap-2 sm:gap-5">
                  <input
                    type="text"
                    placeholder="Street Address 1"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="address_1"
                    value={shipping?.address_1}
                    onChange={handleShippingOnchange}
                  />
                  <input
                    type="text"
                    placeholder="Street Address 2"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="address_2"
                    value={shipping?.address_2}
                    onChange={handleShippingOnchange}
                  />
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-5">
                  <input
                    type="text"
                    placeholder="State"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="state"
                    value={shipping?.state}
                    onChange={handleShippingOnchange}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="city"
                    value={shipping?.city}
                    onChange={handleShippingOnchange}
                  />
                  <input
                    type="text"
                    placeholder="Post Code"
                    className="focus:outline-none border rounded-md px-5 h-11 w-full focus:shadow-lg focus:shadow-outline placeholder:text-sm"
                    name="postcode"
                    value={shipping?.postcode}
                    onChange={handleShippingOnchange}
                  />
                </div>
                <div onClick={handleShippingClick} className="w-fit">
                  <Button
                    size="md"
                    className={`flex items-center gap-2 ${shippingClickloading && "bg-themeSecondary800"}`}
                  >
                    {shippingClickloading && (
                      <svg
                        className={`ml-2 animate-spin h-5 w-5 text-white`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    )}
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
