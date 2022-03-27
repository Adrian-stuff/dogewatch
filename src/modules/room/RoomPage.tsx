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

RoomPage.requireAuth = true;

// RoomPage.getInitialProps = async ({ queryRoomPage.getInitialProps = async ({ query }) => {
//   const id = typeof query.id === "string" ? query.id : "";
//   return { id: id };
// }; }) => {
//   const id = typeof query.id === "string" ? query.id : "";
//   return { id: id };
// };
export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const token = await getToken({ req, raw: true });
  console.log("here");
  console.log(token);
  const id = typeof query.id === "string" ? query.id : "";
  return { props: { token: token, id: id } };
};
