import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "react-loading-skeleton/dist/skeleton.css";
import Layout from "../src/components/layout/Layout";
import { ToastProvider } from "react-toast-notifications";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Layout className="z-[999999999]">
        <Component {...pageProps} />
      </Layout>
    </ToastProvider>
  );
}
