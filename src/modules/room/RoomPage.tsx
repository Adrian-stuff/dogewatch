import { Button, Container, Text } from "@mantine/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { PageComponent } from "../../common/types/PageComponent";
import { SendRoomEvents } from "../../common/types/roomEvents";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { SocketContext } from "../ws/SocketProvider";
interface RoomPageProps {
  id: string;
}
// implement more socket stuff
export const RoomPage: PageComponent<RoomPageProps> = ({ id }) => {
  const socket = useContext(SocketContext);
  const name = useSession().data?.user?.name;
  const [xd, setXd] = useState(false);
  const ping = useCallback(() => socket?.emit("ping"), []);
  useEffect(() => {
    // if (name) {
    //   // socket?.emit(
    //   //   SendRoomEvents.JOIN_ROOM,
    //   //   { roomID: id, username: name },
    //   //   () => {}
    //   // );
    // }
    socket?.on("ping", () => {
      console.log("PING!");
      setXd(true);
    });
    return () => {
      socket?.off("ping");
    };
  }, []);
  return (
    <WaitForWsAndAuth>
      <Container>
        <Text>{id}</Text>
        <Text>room</Text>
        {xd && <Text>PING</Text>}
        <Button onClick={ping}>PING</Button>
      </Container>
    </WaitForWsAndAuth>
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
