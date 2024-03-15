import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "react-loading-skeleton/dist/skeleton.css";
import Layout from "../src/components/layout/Layout";
import { ToastProvider } from "react-toast-notifications";
import { CartProvider } from "src/CartContext";
import 'react-toastify/dist/ReactToastify.css';
const { ToastContainer } = require('react-toastify');
import { ApolloProvider } from "@apollo/client";
import client from "lib/utils/apollo-client";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <CartProvider>
          {/* temporaire <Layout className="z-[999999999]" menuData={pageProps.menuData}>*/}
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          {/*</Layout>*/}
        </CartProvider>
      </ToastProvider>
    </ApolloProvider>

  );
}
