import { NextResponse } from "next/server";
import { auth } from "@/auth/auth";

import db from "@/lib/db";

export async function POST(req: Request, { params }: { params: { protectId: string } }) {
  try {
    const user = auth();

    const body = await req.json();

    const { country, province, zipcode, district, subdistrict, village } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    /**
    if (!country) {
      return new NextResponse('Country is required', { status: 400 });
    }
    */

    if (!params.protectId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await db.user.findFirst({
      where: {
        id: params.protectId,
        // userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const address = await db.address.create({
      data: {
        village,
        subdistrict,
        district,
        province,
        zipcode,
        country,
        userId: params.protectId,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { protectId: string } }) {
  try {
    if (!params.protectId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const addresses = await db.address.findMany({
      where: {
        userId: params.protectId,
      },
    });

    return NextResponse.json(addresses);
  } catch (error) {
    console.log("[ADDRESS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
