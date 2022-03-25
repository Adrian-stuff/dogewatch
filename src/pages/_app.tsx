import type { AppProps } from "next/app";
import StylesWrapper from "./styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StylesWrapper>
      <Component {...pageProps} />
    </StylesWrapper>
  );
}

export default MyApp;
