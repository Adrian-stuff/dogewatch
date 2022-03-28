import { ReceivedRoomEvents, SendRoomEvents } from "./roomEvents";
import { ReceivedPlayerEvents, SendPlayerEvents } from "./playerEvents";

export interface PlayerData {
  videoID?: string;
  status: number;
  time?: number;
}
export interface ServerToClientEvents {
  ping: () => void;
  // PLAYER
  [ReceivedPlayerEvents.VIDEOID]: (videoID: string) => void;
  [ReceivedPlayerEvents.PLAYERSTATUS]: (status: number) => void;
  [ReceivedPlayerEvents.PLAYERTIMESTAMP]: (time: number) => void;
  // ROOM
  [ReceivedRoomEvents.USER_JOINED]: (username: string) => void;
  [ReceivedRoomEvents.USER_LEAVE]: (username: string) => void;
  [ReceivedRoomEvents.GET_PLAYERDATA]: (socketID: string) => void;
  [ReceivedRoomEvents.SYNC_PLAYERDATA]: (playerData: PlayerData) => void;
}

type callback = ({
  success,
  message,
  data,
}: {
  success: boolean;
  message: string;
  data?: any;
}) => void;

interface CreateRoomType {
  roomID: string;
  username: string;
}

export interface ClientToServerEvents {
  ping: () => void;
  // PLAYER
  [SendPlayerEvents.VIDEOID]: (videoID: string) => void;
  [SendPlayerEvents.PLAYERSTATUS]: (status: number) => void;
  [SendPlayerEvents.PLAYERTIMESTAMP]: (time: number) => void;
  // ROOM
  [SendRoomEvents.CREATE_ROOM]: (
    { roomID, username }: CreateRoomType,
    callback: callback
  ) => void;
  [SendRoomEvents.JOIN_ROOM]: (
    { roomID, username }: CreateRoomType,
    callback: callback
  ) => void;
  [SendRoomEvents.LEAVE_ROOM]: () => void;
  [SendRoomEvents.GET_PLAYERDATA]: (
    socketID: string,
    playerData: PlayerData
  ) => void;
}
