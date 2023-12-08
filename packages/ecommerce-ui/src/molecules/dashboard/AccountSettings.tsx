import React from "react";
import { Button } from "../../atoms/button/Button";
import { Heading3 } from "../../atoms/typography/headingText/heading3";
import { Placeholder } from "../../atoms/placeholder/Placeholder";
import { Country } from "country-state-city";

interface AccountSettingsProps {
  handleUserInfoUpdate?: (e: any) => void;
  // basic info
  handleUpdateClick?: any;
  imagePreview?: string;
  userInfoUdate?: any;
  updateClickloading?: boolean;
  // billing info
  handleBillingUpdate?: (e: any) => void;
  handleBillingClick?: any;
  billing?: any;
  billingClickloading?: boolean;
}

export const AccountSettings = ({
  handleUserInfoUpdate,
  // basic info update
  handleUpdateClick,
  updateClickloading,
  imagePreview,
  userInfoUdate,
  // billing info update
  handleBillingUpdate,
  handleBillingClick,
  billing,
  billingClickloading,
}: AccountSettingsProps) => {
  const [country, setCountry] = React.useState(Country.getAllCountries());

  return (
    <>
      {/******** * Basic Info **********/}
      <div className="p-5 sm:p-10 rounded-2xl border">
        <Heading3 intent="medium" className="text-themeSecondary800">
          Basic Info
        </Heading3>
        <div className="lg:relative">
          <form action="">
            <div className="flex flex-wrap lg:flex-nowrap items-start gap-5 lg:gap-10 mt-6">
              <div className="grow space-y-5">
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-5">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="focus:outline-none border rounded-lg px-5 h-12 w-full focus:shadow-lg focus:shadow-outline"
                    name="first_name"
                    value={userInfoUdate.first_name}
                    onChange={handleUserInfoUpdate}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="focus:outline-none border rounded-lg px-5 h-12 w-full focus:shadow-lg focus:shadow-outline"
                    name="last_name"
                    value={userInfoUdate.last_name}
                    onChange={handleUserInfoUpdate}
                  />
                </div>
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-5">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="focus:outline-none border rounded-lg px-5 h-12 w-full focus:shadow-lg focus:shadow-outline"
                    name="email"
                    value={userInfoUdate.email}
                    onChange={handleUserInfoUpdate}
                  />
                </div>
              </div>
            </div>
            <div onClick={handleUpdateClick} className="w-fit mt-8">
              <Button className={`flex items-center gap-2 ${updateClickloading && "bg-themeSecondary800"}`}>
                {updateClickloading && (
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
          </form>
        </div>
      </div>

      {/******** * Billing Info **********/}
      <div className="p-5 sm:p-10 rounded-2xl border mt-10">
        <Heading3 intent="medium" className="text-themeSecondary800">
          Billing Info
        </Heading3>
        <form action="">
          <div className="space-y-5 mt-6 w-full">
            <div className="flex  flex-wrap md:flex-nowrap items-center gap-5">
              <input
                type="text"
                placeholder="First Name*"
                className="focus:outline-none border rounded-lg px-5 h-12 w-full focus:shadow-lg focus:shadow-outline"
                name="first_name"
                value={billing.first_name}
                onChange={handleBillingUpdate}
              />
              <input
                type="text"
                placeholder="Last Name*"
                className="focus:outline-none border rounded-lg px-5 h-12 w-full focus:shadow-lg focus:shadow-outline"
                name="last_name"
                value={billing.last_name}
                onChange={handleBillingUpdate}
              />
              <input
                type="text"
                placeholder="Company Name"
                className="focus:outline-none border rounded-lg px-5 h-12 w-full focus:shadow-lg focus:shadow-outline"
                name="company"
                value={billing.company}
                onChange={handleBillingUpdate}
              />
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-5">
              <input
                type="email"
                placeholder="Email Address*"
                className="focus:outline-none border rounded-lg px-5 h-12 w-full focus:shadow-lg focus:shadow-outline"
                name="email"
                value={billing.email}
                onChange={handleBillingUpdate}
              />
              <input
                type="text"
                placeholder="Phone*"
                className="focus:outline-none border rounded-lg px-5 h-12 w-full focus:shadow-lg focus:shadow-outline"
                name="phone"
                value={billing.phone}
                onChange={handleBillingUpdate}
              />
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-5">
              <input
                type="text"
                placeholder="Street Address 1*"
                className="focus:outline-none border rounded-lg px-5 h-12 w-full md:w-2/3 focus:shadow-lg focus:shadow-outline"
                name="address_1"
                value={billing.address_1}
                onChange={handleBillingUpdate}
              />
              <input
                type="text"
                placeholder="Street Address 2*"
                className="focus:outline-none border rounded-lg px-5 h-12 w-full md:w-2/3 focus:shadow-lg focus:shadow-outline"
                name="address_2"
                value={billing.address_2}
                onChange={handleBillingUpdate}
              />
              <select
                title="country"
                className="appearance-none border rounded-md w-full md:w-1/3 py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline cursor-pointer svg_icon"
                name="country"
                value={billing.country}
                onChange={handleBillingUpdate}
              >
                <option value="">{billing?.country === "" ? "Country" : billing?.country}</option>
                {country.map((item, index) => (
                  <option key={index} value={item.isoCode}>
                    {item.flag} {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap md:flex-nowrap items-center gap-5">
              <input
                type="text"
                placeholder="State*"
                className="focus:outline-none border rounded-lg px-5 h-12 w-full focus:shadow-lg focus:shadow-outline"
                name="state"
                value={billing.state}
                onChange={handleBillingUpdate}
              />
              <input
                type="text"
                placeholder="City*"
                className="focus:outline-none border rounded-lg px-5 h-12 w-full focus:shadow-lg focus:shadow-outline"
                name="city"
                value={billing.city}
                onChange={handleBillingUpdate}
              />
              <input
                type="text"
                placeholder="Post Code*"
                className="focus:outline-none border rounded-lg px-5 h-12 w-full focus:shadow-lg focus:shadow-outline"
                name="postcode"
                value={billing.postcode}
                onChange={handleBillingUpdate}
              />
            </div>
            <div onClick={handleBillingClick} className="w-fit">
              <Button className={`flex items-center gap-2 ${billingClickloading && "bg-themeSecondary800"}`}>
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

    </>
  );
};
