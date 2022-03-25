import { Button, Center, Container, Text } from "@mantine/core";
import { useRouter } from "next/router";

export default function Custom404() {
  const { replace } = useRouter();
  return (
    <Container>
      <Center style={{ flexDirection: "column" }}>
        <Text>Bro... why tf are u here</Text>
        <Button onClick={() => replace("/")}>Go to a safe place</Button>
      </Center>
    </Container>
  );
}
