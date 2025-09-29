import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { txRef: string } }
) {
  try {
    const res = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${params.txRef}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`, // keep server-side only
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.data) {
      return NextResponse.json(
        { error: `HTTP ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.data.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
