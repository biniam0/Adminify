interface Contact {
  phone: string;
  email: string;
}

interface GuestHouseType {
  id: number;
  name: string;
  images: string[];
  description: string;
  address: string;
  facilities: string[];
  contact: Contact;
}

export type { GuestHouseType, Contact };
