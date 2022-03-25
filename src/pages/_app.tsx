import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { PageComponent } from "../common/types/PageComponent";
import AuthGuard from "../modules/auth/AuthGuard";
import StylesWrapper from "./styles";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <StylesWrapper>
        <ModalsProvider>
          {(Component as PageComponent<unknown>).requireAuth ? (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </ModalsProvider>
      </StylesWrapper>
    </SessionProvider>
  );
}

export default MyApp;
