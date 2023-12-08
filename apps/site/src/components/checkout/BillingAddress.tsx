import React from "react";
import { PayMethods } from "./PayMethods";
import { BodyText } from "@jstemplate/ecommerce-ui";


interface BillingAddressProps {
  user?: any;
  showShipping?: boolean;
  handleShowShippingChange: () => void;
  country: any[];
  state: any[];
  handleBillingChange: (e:any) => void;
  handleShippingChange: (e:any) => void;
}

export const BillingAddress = ({
  user,
  showShipping,
  handleShowShippingChange,
  country,
  state,
  handleBillingChange,
  handleShippingChange,
}: BillingAddressProps) => {
  return (
    <>
      <div className="w-full lg:col-span-8">
        <div className="p-2.5 bg-white rounded-2xl">
          {/* billing address form */}
          <div className="grid lg:gap-3 gap-8">
            {/* Form Title */}
            <BodyText
              size="xl"
              intent="medium"
              className="p-2.5 bg-themeSecondary100 rounded-xl text-themeSecondary800"
            >
              Billing Details
            </BodyText>
            {/* Form input lists */}
            <form action="">
              <div className="w-full grid gap-5 px-2 sm:p-7">
                {/* First Name & Last Name */}
                <div className="sm:flex grid sm:gap-5 gap-8    ">
                  {/* First Name */}
                  <div className="sm:w-1/2 w-full">
                    <div className="relative">
                      <input
                        className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        onChange={handleBillingChange}
                        defaultValue={user?.billing?.first_name}
                      />
                    </div>
                  </div>
                  {/* Last Name */}
                  <div className="sm:w-1/2 w-full">
                    <div className="relative">
                      <input
                        className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        onChange={handleBillingChange}
                        defaultValue={user?.billing?.last_name}
                      />
                    </div>
                  </div>
                </div>
                {/* phone & email */}
                <div className="sm:flex grid sm:gap-5 gap-8">
                  {/* phone */}
                  <div className="sm:w-1/2 w-full">
                    <div className="relative">
                      <input
                        className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        onChange={handleBillingChange}
                        defaultValue={user?.billing?.phone}
                      />
                    </div>
                  </div>
                  {/* Email address */}
                  <div className="sm:w-1/2 w-full">
                    <div className="relative">
                      <input
                        className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                        type="email"
                        placeholder="Your Email Address"
                        name="email"
                        onChange={handleBillingChange}
                        defaultValue={user?.billing?.email}
                      />
                    </div>
                  </div>
                </div>
                {/* Street address */}
                <div className="sm:flex grid sm:gap-5 gap-8">
                  <div className="w-full">
                    <div className="relative">
                      <input
                        className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                        type="text"
                        placeholder="Street Address"
                        name="address_1"
                        onChange={handleBillingChange}
                        defaultValue={user?.billing?.address_1}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="relative">
                      <input
                        className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                        type="text"
                        placeholder="Apartment/Suite/Unit Etc"
                        name="address_2"
                        onChange={handleBillingChange}
                        defaultValue={user?.billing?.address_2}
                      />
                    </div>
                  </div>
                </div>
                {/* Town / City & country */}
                <div className="sm:flex grid sm:gap-5 gap-8">
                  {/* Town / City */}
                  <div className="sm:w-1/2 w-full">
                    <div className="relative">
                      <input
                        className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                        type="text"
                        placeholder="Town/City"
                        name="city"
                        onChange={handleBillingChange}
                        defaultValue={user?.billing?.city}
                      />
                    </div>
                  </div>
                  {/* country */}
                  <div className="sm:w-1/2 w-full">
                    <div className="relative">
                      <select
                        title="state"
                        className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline cursor-pointer svg_icon"
                        name="country"
                        onChange={handleBillingChange}
                        defaultValue={user?.billing?.country}
                      >
                        <option value="">
                          {user?.billing?.country === "" ? "Choose Country" : user?.billing?.country}
                        </option>
                        {country.map((item, index) => (
                          <option key={index} value={item.isoCode}>
                            {item.flag} {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* Postcode / ZIP & State */}
                <div className="sm:flex grid sm:gap-5 gap-8">
                  {/* Postcode / ZIP */}
                  <div className="sm:w-1/2 w-full">
                    <div className="relative">
                      <input
                        className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                        type="text"
                        placeholder="Post Code"
                        name="postcode"
                        onChange={handleBillingChange}
                        defaultValue={user?.billing?.postcode}
                      />
                    </div>
                  </div>
                  {/* State */}
                  <div className="sm:w-1/2 w-full">
                    <div className="relative">
                      <select
                        title="state"
                        className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline cursor-pointer svg_icon"
                        name="state"
                        onChange={handleBillingChange}
                        defaultValue={user?.billing?.state}
                      >
                        <option value="">{user?.billing?.state === "" ? "Choose State" : user?.billing?.state}</option>
                        {state.map((item: any, index: any) => (
                          <option key={index} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* checkbox for shipping address */}
                <div className="flex gap-3">
                  <input
                    onChange={handleShowShippingChange}
                    defaultChecked={showShipping}
                    id="ship-checkbox"
                    type="checkbox"
                    className="w-5 h-5 cursor-pointer accent-themePrimary700"
                  />
                  <label htmlFor="ship-checkbox" className="text-base text-themeSecondary600">
                    Ship to a different address instead of the billing address
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* shipping address form */}
          {showShipping && (
            <div className="grid lg:gap-3 gap-8">
              {/* Form Title */}
              <BodyText
                size="xl"
                intent="medium"
                className="p-2.5 bg-themeSecondary100 rounded-xl text-themeSecondary800"
              >
                Shipping Details
              </BodyText>
              {/* Form input lists */}
              <form action="">
                <div className="w-full grid gap-5 px-2 sm:p-7">
                  {/* First Name & Last Name */}
                  <div className="sm:flex grid sm:gap-5 gap-8">
                    {/* First Name */}
                    <div className="sm:w-1/2 w-full">
                      <div className="relative">
                        <input
                          className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                          type="text"
                          placeholder="First Name"
                          name="first_name"
                          onChange={handleShippingChange}
                          defaultValue={user?.shipping?.first_name}
                        />
                      </div>
                    </div>
                    {/* Last Name */}
                    <div className="sm:w-1/2 w-full">
                      <div className="relative">
                        <input
                          className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                          type="text"
                          placeholder="Last Name"
                          name="last_name"
                          onChange={handleShippingChange}
                          defaultValue={user?.shipping?.last_name}
                        />
                      </div>
                    </div>
                  </div>
                  {/* phone & email */}
                  <div className="sm:flex grid sm:gap-5 gap-8">
                    {/* phone */}
                    {/* <div className="sm:w-1/2 w-full"> */}
                    <div className="w-full">
                      <div className="relative">
                        <input
                          className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                          type="text"
                          placeholder="Phone"
                          name="phone"
                          onChange={handleShippingChange}
                          defaultValue={user?.shipping?.phone}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Street address */}
                  <div className="sm:flex grid sm:gap-5 gap-8">
                    <div className="w-full">
                      <div className="relative">
                        <input
                          className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                          type="text"
                          placeholder="Street Address"
                          name="address_1"
                          onChange={handleShippingChange}
                          defaultValue={user?.shipping?.address_1}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="relative">
                        <input
                          className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                          type="text"
                          placeholder="Apartment/Suite/Unit Etc"
                          name="address_2"
                          onChange={handleShippingChange}
                          defaultValue={user?.shipping?.address_2}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Town / City & country */}
                  <div className="sm:flex grid sm:gap-5 gap-8">
                    {/* Town / City */}
                    <div className="sm:w-1/2 w-full">
                      <div className="relative">
                        <input
                          className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                          type="text"
                          placeholder="Town/City"
                          name="city"
                          onChange={handleShippingChange}
                          defaultValue={user?.shipping?.city}
                        />
                      </div>
                    </div>
                    {/* country */}
                    <div className="sm:w-1/2 w-full">
                      <div className="relative">
                        <select
                          title="state"
                          className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline cursor-pointer svg_icon"
                          name="country"
                          onChange={handleShippingChange}
                          defaultValue={user?.shipping?.country}
                        >
                          <option value="">
                            {user?.shipping?.country === "" ? "Choose Country" : user?.shipping?.country}
                          </option>
                          {country.map((item, index) => (
                            <option key={index} value={item.isoCode}>
                              {item.flag} {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Postcode / ZIP & State */}
                  <div className="sm:flex grid sm:gap-5 gap-8">
                    {/* Postcode / ZIP */}
                    <div className="sm:w-1/2 w-full">
                      <div className="relative">
                        <input
                          className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline"
                          type="text"
                          placeholder="Post Code"
                          name="postcode"
                          onChange={handleShippingChange}
                          defaultValue={user?.shipping?.postcode}
                        />
                      </div>
                    </div>
                    {/* State */}
                    <div className="sm:w-1/2 w-full">
                      <div className="relative">
                        <select
                          title="Country"
                          className="appearance-none border rounded-md w-full py-3.5 px-5 text-themeSecondary600 border-themeSecondary300 leading-tight focus:outline-none focus:shadow-lg focus:shadow-outline cursor-pointer svg_icon"
                          name="state"
                          onChange={handleShippingChange}
                        >
                          <option value="">
                            {user?.shipping?.state === "" ? "Choose State" : user?.shipping?.state}
                          </option>
                          {state.map((item: any, index: any) => (
                            <option key={index} value={item.value}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
        {/* <PayMethods billingDetails={billing} shippingDetails={shipping} shipingCheck={showShipping} /> */}
      </div>
    </>
  );
};
