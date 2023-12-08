import React from "react";
import { BlockLayout, Spaces, AccountSettings } from "@jstemplate/ecommerce-ui";
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

const UserAccountSettings = ({ userData }: DashboardProps) => {

  const { addToast } = useToasts();
  const [imagePreview, setImagePreview] = React.useState<any>("");
  const [updateClickloading, SetUpdateClickSetLoading] = React.useState(false);
  const { customer, error, updateCustomer, updateCustomerBillingAddress } = useUpdateCustomer();

  /* -------------------------------------------------------------------------- */
  /*                               start basic info                              */
  /* -------------------------------------------------------------------------- */
  // basic info
  const [userInfoUdate, setUserInfoUpdate] = React.useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    avatar_url: "",
  });

  // basic info on change
  const handleUserInfoUpdate = (e: any) => {
    const { name, value } = e.target;
    setUserInfoUpdate({ ...userInfoUdate, [name]: value });
    if (name === "avatar_url") {
      setUserInfoUpdate({ ...userInfoUdate, [name]: e?.target?.files[0] });
      setImagePreview(URL.createObjectURL(e?.target?.files[0]));
    }
  };

  // basic info on submit
  const handleUpdateClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    SetUpdateClickSetLoading(true);

    // check if email field is not have any space
    if (userInfoUdate.email.includes(" ")) {
      addToast("Email field can not have any space", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 2000,
      });
      SetUpdateClickSetLoading(false);
      return;
    }
    await updateCustomer(userInfoUdate).then((res) => {
      if (res) {
        addToast("Profile updated successfully", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 1000,
        });
      }
      SetUpdateClickSetLoading(false);
    });
  };

  // basic info on load
  React.useEffect(() => {
    if (customer || userData) {
      setUserInfoUpdate({
        first_name: customer?.first_name || userData?.first_name,
        last_name: customer?.last_name || userData?.last_name,
        email: customer?.email || userData?.email,
        avatar_url: customer?.avatar_url || userData?.avatar_url,
      });
      setImagePreview(userData?.avatar_url);
    }
  }, [userData]);

  /* -------------------------------------------------------------------------- */
  /*                              start billangs info                              */
  /* -------------------------------------------------------------------------- */
  const [billingClickloading, setBillingClickloading] = React.useState(false);
  const [billing, setBilling] = React.useState({}) as any;
  const handleBillingUpdate = (e: any) => setBilling({ ...billing, [e.target.name]: e.target.value });
  const handleBillingClick = async (e: any) => {
    e.preventDefault();
    setBillingClickloading(true);
    // check if email field is not have any space
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


  return (
    <>
      <Spaces size="sm" />
      <BlockLayout>
        <div className="lg:flex items-start gap-10 space-y-10 lg:space-y-0">
          <DashboardSideBar sidebarMenu={sidebarMenu} userData={userData} />
          <div className="grow">
            <AccountSettings
              // basic info update
              handleUserInfoUpdate={handleUserInfoUpdate}
              handleUpdateClick={handleUpdateClick}
              updateClickloading={updateClickloading}
              userInfoUdate={userInfoUdate}
              // image preview
              imagePreview={imagePreview}
              // billing update
              handleBillingUpdate={handleBillingUpdate}
              handleBillingClick={handleBillingClick}
              billingClickloading={billingClickloading}
              billing={billing}
            />
          </div>
        </div>
      </BlockLayout>
      <Spaces />
    </>
  );
};

export default withAuth(UserAccountSettings);
