import { NextResponse } from "next/server";
import { auth } from "@/auth/auth";

import db from "@/lib/db";

export async function POST(req: Request, { params }: { params: { protectId: string } }) {
  try {
    const user = auth();

    const body = await req.json();

    const { name, value, imageUrl } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    /**
    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
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

    const match = await db.match.create({
      data: {
        name,
        value,
        imageUrl,
        userId: params.protectId,
      },
    });

    return NextResponse.json(match);
  } catch (error) {
    console.log("[MATCH_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { protectId: string } }) {
  try {
    if (!params.protectId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const matchs = await db.match.findMany({
      where: {
        userId: params.protectId,
      },
    });

    return NextResponse.json(matchs);
  } catch (error) {
    console.log("[MATCH_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
