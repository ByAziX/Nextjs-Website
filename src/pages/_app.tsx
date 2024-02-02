import { ChakraProvider } from "@chakra-ui/react";
import { SpeedInsights } from "@vercel/speed-insights/next"


import theme from "../theme";
import { AppProps } from "next/app";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      <SpeedInsights/>
    </ChakraProvider>

  );
}

export default MyApp;
