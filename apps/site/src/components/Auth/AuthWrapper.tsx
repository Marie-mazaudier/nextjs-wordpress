import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useUserDetails } from "../../../lib/woocommerce/user/useUserDetails";
import { Circles } from "react-loader-spinner";

export default function withAuth(WrappedComponent: React.ComponentType<any>) {
  return function (props: any) {
    const router = useRouter();

    let get_log_form_info: any = getCookie("__user__login__info");
    if (get_log_form_info) {
      get_log_form_info = JSON.parse(get_log_form_info);
    }

    const { user, error, isLoading } = useUserDetails();

    useEffect(() => {
      if (!get_log_form_info) {
        router.push("/");
      }
    }, [get_log_form_info]);

    return (
      <>
        {!user && (
          <div className="loader_stye_add">
            <div className="grid justify-center justify-items-center">
              <Circles
                height="90"
                width="90"
                color="#ff5722"
                ariaLabel="circles-loading"
                wrapperClass=""
                visible={true}
              />
            </div>
          </div>
        )}
        <WrappedComponent {...props} userData={user} />
      </>
    );
  };
}
