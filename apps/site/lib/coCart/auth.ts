import { useState } from "react";
import axios from "axios";


export function useCocartLogout() {
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/wp-json/cocart/v2/logout`
      );
      setLoading(false);
      return res.data;
    } catch (error: any) {
      setLoading(false);
      return error;
    }
  }

  return { loading, logout };
}



// export function useCocartLogin() {
//   const [loading, setLoading] = useState(false);

//   async function login(username: any, password: any, remember: any) {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/wp-json/cocart/v2/login`,
//         {},
//         {
//           auth: {
//             username: username,
//             password: password,
//           },
//         }
//       );
//       if (res.data.role === "Customer") {
//         setLoading(false);
//         if (!getCookie("__user__login__info")) {
//           const logInfo = {
//             username: res.data.display_name,
//             email: res.data.email,
//             id: res.data.user_id,
//             role: res.data.role,
//             remember: remember,
//             avatar: res.data.avatar_urls,
//           };
//           if (remember != false) {
//             setCookies("__user__login__info", logInfo, { maxAge: 60 * 60 * 24 * 7 }); // 7 days
//           } else {
//             setCookies("__user__login__info", logInfo);
//           }
//         }
//         return res.data;
//       }
//       if (res.data.role !== "Customer") {
//         setLoading(false);
//         return "not customer";
//       }
//     } catch (error: any) {
//       setLoading(false);
//       return error;
//     }
//   }

//   return { loading, login };
// }
