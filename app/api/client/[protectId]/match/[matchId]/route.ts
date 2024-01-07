import { NextResponse } from "next/server";

import db from "@/lib/db";
import { auth } from "@/auth/auth";

export async function GET(req: Request, { params }: { params: { matchId: string } }) {
  try {
    if (!params.matchId) {
      return new NextResponse("Match id is required", { status: 400 });
    }

    const match = await db.match.findUnique({
      where: {
        id: params.matchId,
      },
    });

    return NextResponse.json(match);
  } catch (error) {
    console.log("[MATCH_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { matchId: string; protectId: string } }) {
  try {
    const user = auth();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.matchId) {
      return new NextResponse("Match id is required", { status: 400 });
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

    const match = await db.match.delete({
      where: {
        id: params.matchId,
      },
    });

    return NextResponse.json(match);
  } catch (error) {
    console.log("[MATCH_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { matchId: string; protectId: string } }) {
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

    if (!params.matchId) {
      return new NextResponse("Match id is required", { status: 400 });
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

    const match = await db.match.update({
      where: {
        id: params.matchId,
      },
      data: {
        name,
        value,
        imageUrl,
      },
    });

    return NextResponse.json(match);
  } catch (error) {
    console.log("[MATCH_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
