import { Container, Text, Button, Image } from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import { useModals } from "@mantine/modals";
import CreateRoom from "./useRoomModal";
import { createRef } from "react";
import useRoomModal from "./useRoomModal";
import { useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { PageComponent } from "../../common/types/PageComponent";

interface HomeProps {}

const Home: PageComponent<HomeProps> = () => {
  const roomRef = createRef<HTMLInputElement>();
  const { data: session } = useSession();
  const createRoomModal = useRoomModal({
    title: "Create Room",
    id: "create-room",
    roomRef: roomRef,
    onSubmit: () => {
      console.log(roomRef.current?.value);
    },
  });

  const joinRoomModal = useRoomModal({
    title: "Join Room",
    id: "join-room",
    roomRef: roomRef,
    onSubmit: () => {
      console.log(roomRef.current?.value);
    },
  });

  return (
    <WaitForWsAndAuth>
      <Container>
        <Button onClick={() => createRoomModal()}>CreateRoom</Button>
        <Button onClick={() => joinRoomModal()}>JoinRoom</Button>
        {session && (
          <>
            <Text>{session?.user?.name}</Text>
            {session.user?.image && <Image src={session?.user?.image}></Image>}
          </>
        )}
      </Container>
    </WaitForWsAndAuth>
  );
};

Home.ws = true;
// export const getServerSideProps: GetServerSideProps = async({req,res}) =>{
//   return {
//     props:{}
//   }
// }

export default Home;
