import { Button, Center, Container, Loader, Modal } from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import HomePage from "../home/HomePage";
import { getToken } from "next-auth/jwt";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { useTokenStore } from "../auth/useTokenStore";

const LoginPage: NextPage = () => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const tokenStore = useTokenStore();
  useEffect(() => {
    if (session) {
      push("/home");
      tokenStore.setTokens({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      });
    }
  }, [session, tokenStore]);
  return (
    <>
      <Head>
        <title>Dogewatch</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        {!session ? (
          <Modal
            centered
            opened={session === null}
            onClose={() => {
              if (!session) return;
            }}
            withCloseButton={false}
          >
            <Button onClick={() => signIn("google")}>
              {" "}
              Sign in with google
            </Button>
          </Modal>
        ) : (
          <Container>
            <Center>
              <Loader size="lg" type="bars" />
            </Center>
          </Container>
        )}
      </Container>
    </>
  );
};

export default LoginPage;
