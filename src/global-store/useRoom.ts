import create from "zustand";
import { combine } from "zustand/middleware";
interface RoomState {
  roomID: string;
}

interface RoomStore {
  setRoomData: (data: any) => void;
}
function getDefaultValue(): RoomState {
  return { roomID: "" };
}
const useRoom = create(
  combine<RoomState, RoomStore>(getDefaultValue(), (set, get) => ({
    setRoomData: () => set({ roomID: "" }),
  }))
);

export default useRoom;
