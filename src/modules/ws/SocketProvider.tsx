import React, { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useTokenStore } from "../auth/useTokenStore";
interface SocketProviderProps {
  shouldConnect: boolean;
}
export type User = {};

type V = Socket | null;

export let socket: V = null;

export const SocketContext = React.createContext<{
  conn: V;
  // setUser: (u: User) => void;
  setConn: (u: V) => void;
}>({
  conn: null,
  // setUser: () => {},
  setConn: () => {},
});

export const SocketProvider: React.FC<SocketProviderProps> = ({
  shouldConnect,
  children,
}) => {
  const [conn, setConn] = useState<V>(null);
  const hasTokens = useTokenStore((s) => s.accessToken && s.refreshToken);
  const isConnecting = useRef(false);

  useEffect(() => {
    if (!conn && shouldConnect && hasTokens && !isConnecting.current) {
      socket = io(process.env.SERVER_URL as string);
      isConnecting.current = true;
      socket.on("connect", () => {
        socket!
          .emit("authenticate", { token: useTokenStore.getState().accessToken })
          .on("authenticated", () => {
            // do something if authenticated
            // if authenticated
            setConn(socket);
            isConnecting.current = false;
          })
          .on("unauthorized", (msg) => {
            console.log(`unauthorized ${JSON.stringify(msg.data)}`);
            isConnecting.current = false;
          });
      });
    }
  }, [conn, shouldConnect, hasTokens]);
  return (
    <SocketContext.Provider
      value={useMemo(
        () => ({
          conn,
          setConn,
          // setUser: (u: User) => {
          //   if (conn) {
          //     setConn({
          //       ...conn,
          //       user: u,
          //     });
          //   }
          // },
        }),
        [conn]
      )}
    >
      {children}
    </SocketContext.Provider>
  );
};
