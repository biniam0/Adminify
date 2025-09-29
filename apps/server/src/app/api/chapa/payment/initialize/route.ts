import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const chapaSecretKey = process.env.CHAPA_SECRET_KEY;
    console.log("Using Chapa Secret Key:", process.env.CHAPA_SECRET_KEY);

    if (!chapaSecretKey) {
      return NextResponse.json(
        { message: "Chapa secret key not configured" },
        { status: 500 }
      );
    }

    // Parse the JSON body from NextRequest
    const paymentData = await request.json();
    console.log("Received payment data:", paymentData);


    // Make the request to Chapa API
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${chapaSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return Chapa response as NextResponse JSON
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error initializing Chapa payment:", error);
    return NextResponse.json(
      { message: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
