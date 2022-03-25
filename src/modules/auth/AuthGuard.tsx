import { Box, Center, Container, Loader } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface AuthGuardProps {}
const AuthGuard: React.FC = ({ children }) => {
  const { replace } = useRouter();
  const { status, data } = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status !== "loading") {
      if (status === "authenticated") {
        setLoading(false);
      } else if (status === "unauthenticated") {
        replace("/");
      }
    }
  }, [data, status]);
  if (loading) {
    return (
      <Container>
        <Center>
          <Loader size="lg" type="bars" />
        </Center>
      </Container>
    );
  }

  if (status === "authenticated" && data?.user) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
