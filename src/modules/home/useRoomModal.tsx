import { TextInput, Button } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { ForwardedRef } from "react";

interface RoomModalProps {
  title: string;
  id: string;
  roomRef: ForwardedRef<HTMLInputElement>;
  onSubmit: () => void;
  buttonSubmitText?: string;
}

const useRoomModal = ({
  title,
  id,
  roomRef,
  onSubmit,
  buttonSubmitText,
}: RoomModalProps) => {
  const modals = useModals();

  return () =>
    modals.openModal({
      title,
      id,
      children: (
        <>
          <TextInput ref={roomRef} placeholder="room" />
          <Button
            onClick={() => {
              modals.closeModal(id);
              if (onSubmit) onSubmit();
            }}
          >
            {buttonSubmitText ? buttonSubmitText : "Submit"}
          </Button>
        </>
      ),
    });
};

export default useRoomModal;
