import { Container, Text } from "@mantine/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getToken } from "next-auth/jwt";
import React from "react";
import { PageComponent } from "../../common/types/PageComponent";
interface RoomPageProps {
  id: string;
}
export const RoomPage: PageComponent<RoomPageProps> = ({ id }) => {
  return (
    <Container>
      <Text>{id}</Text>
      <Text>room</Text>
    </Container>
  );
};

RoomPage.ws = true;
RoomPage.getInitialProps = async ({ query }) => {
  const id = typeof query.id === "string" ? query.id : "";
  return { id };
};
// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   query,
// }) => {
//   const id = typeof query.id === "string" ? query.id : "";
//   return { props: { id: id } };
// };
