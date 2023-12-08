import React from "react";
import { BlockLayout, Spaces, DashBoard } from "@jstemplate/ecommerce-ui";
import { sidebarMenu } from "../../src/data/SidebarMenu";
import dynamic from "next/dynamic";
import withAuth from "../../src/components/Auth/AuthWrapper";
import { useUpdateCustomer } from "../../lib/woocommerce/user/useUserUpdate";
import { useToasts } from "react-toast-notifications";

const DashboardSideBar = dynamic(() => import("../../src/components/DashboardSideBar/DashboardSideBar"), {
  ssr: false,
});

interface DashboardProps {
  userData?: any;
}

const Dashboard = ({ userData }: DashboardProps) => {
  const { addToast } = useToasts();
  const { customer, updateCustomerBillingAddress, updateCustomerShippingAddress } = useUpdateCustomer();
  /* -------------------------------------------------------------------------- */
  /*               start to update billings address                              */
  /* -------------------------------------------------------------------------- */
  const [billingClickloading, setBillingClickloading] = React.useState(false);
  const [billing, setBilling] = React.useState({}) as any;
  const handleBillingOnchange = (e: any) => setBilling({ ...billing, [e.target.name]: e.target.value });
  const handleBillingClick = async (e: any) => {
    e.preventDefault();
    setBillingClickloading(true);
    if (billing?.email.includes(" ")) {
      addToast("Email field can not have any space", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
      setBillingClickloading(false);
      return;
    }
    await updateCustomerBillingAddress(billing).then((res) => {
      if (res) {
        addToast("Billing updated successfully", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 1000,
        });
      }
    });
    setBillingClickloading(false);
  };
  React.useEffect(() => setBilling(customer?.billing || userData?.billing || {}), [customer, userData]);

  /* -------------------------------------------------------------------------- */
  /*               start to update billings address                                */
  /* -------------------------------------------------------------------------- */
  const [shippingClickloading, setShippingClickloading] = React.useState(false);
  const [shipping, setShipping] = React.useState({}) as any;
  const handleShippingOnchange = (e: any) => setShipping({ ...shipping, [e.target.name]: e.target.value });
  const handleShippingClick = async (e: any) => {
    e.preventDefault();
    setShippingClickloading(true);
    await updateCustomerShippingAddress(shipping).then((res) => {
      if (res) {
        addToast("Shipping updated successfully", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 1000,
        });
      }
    });
    setShippingClickloading(false);
  };
  React.useEffect(() => setShipping(customer?.shipping || userData?.shipping || {}), [customer, userData]);

  return (
    <>
      <Spaces size="sm" />
      <BlockLayout>
        <div className="lg:flex items-start gap-10 space-y-10 lg:space-y-0">
          <DashboardSideBar sidebarMenu={sidebarMenu} userData={userData} />
          <div className="grow">
            <DashBoard
              // billing props
              billingClickloading={billingClickloading}
              handleBillingOnchange={handleBillingOnchange}
              handleBillingClick={handleBillingClick}
              billing={billing}
              // shipping props
              shippingClickloading={shippingClickloading}
              handleShippingOnchange={handleShippingOnchange}
              handleShippingClick={handleShippingClick}
              shipping={shipping}
            />
          </div>
        </div>
      </BlockLayout>
      <Spaces />
    </>
  );
};

export default withAuth(Dashboard);
