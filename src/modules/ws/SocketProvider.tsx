import React, { useEffect, useMemo, useRef, useState } from "react";
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
    return io(process.env.SOCKET_URL as string).emit("authenticate", {
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
  const socket = useMemo(() => {
    if (shouldConnect) return getSocket();
    else return null;
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
