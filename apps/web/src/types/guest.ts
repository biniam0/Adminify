interface Contact {
  phone: string;
  email: string;
}

type RoomType = {
  id: string;
  name: string;
  roomId: string;
  type: string; //"Single" | "Double" | "Suite" | "Double Deluxe";
  price: string;
  description: string;
  images: string[];
  amenities: string[];
  availability: boolean;
  guestHouseId: string;
  occupiedById: string | null;
};

interface GuestHouseType {
  id: string;
  name: string;
  images: string[];
  description: string;
  address: string;
  facilities: string;
  contact: Contact;
  rooms?: RoomType[];
}

export type { GuestHouseType, Contact };
