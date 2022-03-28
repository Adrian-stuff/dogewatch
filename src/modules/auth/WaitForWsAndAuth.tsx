import React, { useContext } from "react";
import { SocketContext } from "../ws/SocketProvider";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {}

export const WaitForWsAndAuth: React.FC<WaitForWsAndAuthProps> = ({
  children,
}) => {
  const conn = useContext(SocketContext);

  if (!useVerifyLoggedIn()) {
    return null;
  }

  if (!conn) {
    // @todo make this better
    return <div className="flex">loading...</div>;
  }

  return <>{children}</>;
};
