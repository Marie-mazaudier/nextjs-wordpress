import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { getCookie, setCookies } from "cookies-next";
import axios from "axios";


export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  function createUser(data: any, reset: any, setActive:any) {
    if (data.password !== data.confirmPassword) {
      addToast("Passwords do not match", { appearance: "error", autoDismiss: true, autoDismissTimeout: 3000 });
      return;
    }
    setLoading(true);
    axios.post("/api/auth/register", data)
      .then((response) => {
        addToast("Account Created Successfully", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        setLoading(false);
        reset();
        if (!getCookie("signup__user__info")) {
          const userInfo = {
            username: response.data.username,
            email: response.data.email,
            id: response.data.id,
          };
          setCookies("created__user__info", userInfo);
        }
        setTimeout(() => {
          setActive(0);
         }, 1000);
      })
      .catch((error) => {
        if (
          error.response.data.code == "registration-error-email-exists" ||
          error.response.data.code == "registration-error-username-exists"
        ) {
          addToast("Email or Username already exists", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 2000,
          });
        }
        if (error.response.data.code == "customer_invalid_email") {
          addToast("Invalid Email", { appearance: "error", autoDismiss: true, autoDismissTimeout: 2000 });
        }
        setLoading(false);
      });
  }

  return { createUser, loading };
}