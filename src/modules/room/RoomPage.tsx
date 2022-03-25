import React from "react";
import { PageComponent } from "../../common/types/PageComponent";
interface RoomPageProps {}
export const RoomPage: PageComponent<RoomPageProps> = () => {
  return <div>room</div>;
};

RoomPage.requireAuth = true;

export default RoomPage;
