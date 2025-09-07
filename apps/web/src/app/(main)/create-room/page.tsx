import { getGuestHouses } from "@/actions/guestHouse/guestHouses";
import RoomForm from "@/components/room/RoomForm";
import React from "react";

const CreateRoom = async () => {
  const guestHouses = await getGuestHouses()
  return <RoomForm guestHouses={guestHouses} />;
};

export default CreateRoom;
