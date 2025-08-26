interface Contact {
  phone: string;
  email: string;
}

type RoomType = {
  id: number;
  name: string;
  roomId: string;
  type: "Single" | "Double" | "Suite" | "Double Deluxe";
  price: number;
  description: string;
  images: string[];
  amenities: string[];
  availability: boolean;
};

interface GuestHouseType {
  id: number;
  name: string;
  images: string[];
  description: string;
  address: string;
  facilities: string[];
  contact: Contact;
  rooms?: RoomType[];
}

export type { GuestHouseType, Contact };
