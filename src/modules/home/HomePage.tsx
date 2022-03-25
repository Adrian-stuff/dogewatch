import { Container, Text, Button } from "@mantine/core";
import { NextPage } from "next";
import { useModals } from "@mantine/modals";
import CreateRoom from "./useRoomModal";
import { createRef } from "react";
import useRoomModal from "./useRoomModal";

interface HomeProps {}

const Home: NextPage = () => {
  const roomRef = createRef<HTMLInputElement>();

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
    <Container>
      <Button onClick={() => createRoomModal()}>CreateRoom</Button>
      <Button onClick={() => joinRoomModal()}>JoinRoom</Button>
    </Container>
  );
};

export default Home;
