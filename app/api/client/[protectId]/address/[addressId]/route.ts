import { NextResponse } from "next/server";

import db from "@/lib/db";
import { auth } from "@/auth/auth";

export async function GET(req: Request, { params }: { params: { addressId: string } }) {
  try {
    if (!params.addressId) {
      return new NextResponse("Address id is required", { status: 400 });
    }

    const address = await db.address.findUnique({
      where: {
        id: params.addressId,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { addressId: string; protectId: string } }) {
  try {
    const user = auth();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.addressId) {
      return new NextResponse("Address id is required", { status: 400 });
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

    const address = await db.address.delete({
      where: {
        id: params.addressId,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { addressId: string; protectId: string } }) {
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

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }
    */

    if (!params.addressId) {
      return new NextResponse("Address id is required", { status: 400 });
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

    const address = await db.address.update({
      where: {
        id: params.addressId,
      },
      data: {
        country,
        province,
        zipcode,
        district,
        subdistrict,
        village,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    console.log("[ADDRESS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
