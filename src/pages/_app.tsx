import { ChakraProvider } from "@chakra-ui/react";
import { SpeedInsights } from "@vercel/speed-insights/next"


import theme from "../theme";
import { AppProps } from "next/app";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

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
