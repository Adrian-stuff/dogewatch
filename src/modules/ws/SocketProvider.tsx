import React, { useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../common/types/socketTypes";
import { useTokenStore } from "../auth/useTokenStore";
interface SocketProviderProps {
  shouldConnect: boolean;
}

type V = Socket<ServerToClientEvents, ClientToServerEvents> | null;

// export let socket: V = io(process.env.SOCKER_URL as string);

export const getSocket = () => {
  const { accessToken, refreshToken } = useTokenStore.getState();
  if (accessToken && refreshToken) {
    return io("http://localhost:8000/").emit("authenticate", {
      token: accessToken,
    });
  }
  return null;
};

export const SocketContext = React.createContext<V>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({
  shouldConnect,
  children,
}) => {
  const [conn, setConn] = useState<V>(null);

  useEffect(() => {
    if (!conn && shouldConnect) {
      setConn(getSocket());
    }
  }, []);
  return (
    <SocketContext.Provider value={useMemo(() => conn, [conn])}>
      {children}
    </SocketContext.Provider>
  );
};
