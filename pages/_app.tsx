import { AppProps } from "next/app";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="GTM-NG5S8TMV" />
      <GoogleAnalytics gaId="G-K2T31193HP" />
    </>
  )
}

export default MyApp;
