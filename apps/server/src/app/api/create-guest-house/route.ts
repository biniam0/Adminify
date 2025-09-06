import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // Get the request body - apiClient sends data directly
    const values = await req.json();
    console.log("Received request body:", values); // Debug log
    
    console.log("Processing values:", values); // Debug log
    
    // Validate that we have the required data
    if (!values || !values.name) {
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      );
    }

    // Convert type to match Prisma enum
    const guestHouseType = values.type === "Shared" ? "SHARED" : "PRIVATE";

    const guestHouse = await prisma.guestHouse.create({
      data: {
        name: values.name,
        address: values.address,
        type: guestHouseType,
        // Images as JSON array
        images: values.images || [],
        // Facilities as string array
        facilities: values.facilities || [],
        // Contact as JSON object
        contact: values.contact || {},
        // Feedbacks as JSON array
        feedbacks: values.feedback || [],
        // About as relation (if exists)
        about: values.about?.description ? {
          create: {
            description: values.about.description,
          }
        } : undefined,
        // Location as relation (if exists)
        location: values.location ? {
          create: {
            continent: values.location.continent || "",
            country: values.location.country || "",
            city: values.location.city || "",
            subcity: values.location.subcity || "",
            nearby: values.location.nearby || "",
          }
        } : undefined,
      },
    });

    console.log("Guest house created successfully:", guestHouse.id); // Debug log

    return NextResponse.json({ 
      success: true, 
      id: guestHouse.id 
    }, { status: 201 });
    
  } catch (error: any) {
    console.error("Error while creating guest house:", error);
    return NextResponse.json(
      { 
        error: "Failed to create guest house",
        details: error.message 
      },
      { status: 500 }
    );
  }
}