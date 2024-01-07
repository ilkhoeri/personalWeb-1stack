import { NextResponse } from "next/server";
import { auth } from "@/auth/auth";

import db from "@/lib/db";

export async function POST(req: Request, { params }: { params: { protectId: string } }) {
  try {
    const user = auth();

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

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

    const billboard = await db.billboard.create({
      data: {
        label,
        imageUrl,
        userId: params.protectId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { protectId: string } }) {
  try {
    if (!params.protectId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const billboards = await db.billboard.findMany({
      where: {
        userId: params.protectId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
