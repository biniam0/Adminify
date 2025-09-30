import { NextResponse } from "next/server";
import axios from "axios";

interface Params {
  params: Promise<{ txRef: string }>;
}

export async function GET(req: Request, { params }: Params) {
  const { txRef } = await params; // safe to use now

  try {
    const res = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${txRef}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error(
      "Chapa verification error:",
      error.response?.data || error.message
    );

    const status = error.response?.status || 500;
    const message = error.response?.data || { error: error.message };

    return NextResponse.json(message, { status });
  }
}
