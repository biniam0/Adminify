import type { GuestHouseType } from "@/types/guest";

export const dummyGuestHouses: GuestHouseType[] = [
  {
    id: 1,
    name: "Sunset Guest House",
    images: [
      "https://images.unsplash.com/photo-1755878008095-37b948fd2770?auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=774&q=80",
    ],
    description: "Cozy stay with sea view and great breakfast.",
    address: "123 Beach Road, Addis Ababa",
    facilities: ["Wi-Fi", "Parking", "Breakfast"],
    contact: { phone: "+251-912345678", email: "sunset@guest.com" },
    rooms: [
      {
        id: 1,
        name: "Sunset Single",
        roomId: "R-1001",
        type: "Single",
        price: 50,
        description: "Cozy single room with balcony and sea view.",
        images: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=774&q=80",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=774&q=80"
        ],
        amenities: ["Wi-Fi", "Air Conditioning", "TV", "Mini Bar"],
        availability: true,
      },
      {
        id: 2,
        name: "Sunset Double Deluxe",
        roomId: "R-1002",
        type: "Double Deluxe",
        price: 120,
        description: "Spacious double room with balcony, sea view, and deluxe amenities.",
        images: [
          "https://images.unsplash.com/photo-1600585154260-67a6b97356b2?auto=format&fit=crop&w=774&q=80",
          "https://images.unsplash.com/photo-1560448204-f0e2d2ff7d8b?auto=format&fit=crop&w=774&q=80"
        ],
        amenities: ["Wi-Fi", "Air Conditioning", "TV", "Mini Bar", "Jacuzzi"],
        availability: false,
      },
    ],
  },
  {
    id: 2,
    name: "Highland Lodge",
    images: [
      "https://images.unsplash.com/photo-1501117716987-c8e03e8ee228?auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1551882547-ff69a8d92d74?auto=format&fit=crop&w=774&q=80",
    ],
    description: "Mountain view lodge with deluxe rooms.",
    address: "456 Hilltop, Addis Ababa",
    facilities: ["Wi-Fi", "Breakfast"],
    contact: { phone: "+251-934567890", email: "highland@guest.com" },
    rooms: [
      {
        id: 1,
        name: "Highland Single",
        roomId: "R-2001",
        type: "Single",
        price: 60,
        description: "Single room with mountain view and cozy amenities.",
        images: [
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=774&q=80"
        ],
        amenities: ["Wi-Fi", "Heating", "TV"],
        availability: true,
      },
      {
        id: 2,
        name: "Highland Suite",
        roomId: "R-2002",
        type: "Suite",
        price: 180,
        description: "Luxurious suite with mountain view, balcony, and premium amenities.",
        images: [
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b915?auto=format&fit=crop&w=774&q=80"
        ],
        amenities: ["Wi-Fi", "Air Conditioning", "TV", "Mini Bar", "Jacuzzi"],
        availability: false,
      },
    ],
  },
  // Continue for other guest houses...
];
