interface Contact {
  phone: string;
  email: string;
}

export type EachRoomType =
  | "SINGLE"
  | "DOUBLE"
  | "TWIN"
  | "DELUXE"
  | "SUITE"
  | "FAMILY"
  | "STUDIO"
  | "EXECUTIVE"
  | "PRESIDENTIAL";

type RoomType = {
  id: string;
  name: string;
  roomId: string;
  type: EachRoomType;
  price: string;
  description: string;
  images: { url: string; name: string }[];
  availability: boolean;
  guestHouseId: string;
  occupiedById: string | null;
  square_meters: number;
  max_occupancy: number;
  beds: {
    single_beds: number;
    double_beds: number;
    queen_beds: number;
    king_beds: number;
    sofa_beds: number;
    cribs: boolean;
  };
  living_features: {
    private_bathroom: boolean;
    bathtub: boolean;
    shower: boolean;
    hairdryer: boolean;
    minibar: boolean;
    tv: boolean;
    streaming_tv: boolean;
    wifi_available: boolean;
  };
  kitchen_features: {
    coffee_maker: boolean;
    refrigerator: boolean;
    microwave: boolean;
  };
  accessibility: {
    wheelchair_accessible: boolean;
  };
  hygiene_features: {
    sanitizer: boolean;
    hygiene_kits: boolean;
    digital_keys: boolean;
  };
  last_updated: "2025-08-29T12:00:00Z";
};

type AboutType = {
  description: string;
  review: {
    averageRating: number;
    totalReviewers: number;
  };
};

interface GuestHouseType {
  id: string;
  name: string;
  type: "Shared" | "Private";
  images: { url: string; name: string }[];
  about: AboutType;
  feedback: { message: string; rating: number }[];
  address: string;
  location: {
    continent: string;
    country: string;
    city: string;
    subcity: string;
    nearby: string;
  };
  facilities: string[];
  contact: Contact;
  rooms?: RoomType[];
}

export type { GuestHouseType, RoomType, Contact };
