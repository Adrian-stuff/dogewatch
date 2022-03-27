import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { PageComponent } from "../common/types/PageComponent";
import { SocketProvider } from "../modules/ws/SocketProvider";
import StylesWrapper from "./styles";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SocketProvider shouldConnect={!!(Component as PageComponent<unknown>).ws}>
      <SessionProvider session={session}>
        <StylesWrapper>
          <ModalsProvider>
            <Component {...pageProps} />
          </ModalsProvider>
        </StylesWrapper>
      </SessionProvider>
    </SocketProvider>
  );
}

export default MyApp;
