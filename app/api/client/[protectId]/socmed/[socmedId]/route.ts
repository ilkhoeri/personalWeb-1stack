import { NextResponse } from "next/server";

import db from "@/lib/db";
import { auth } from "@/auth/auth";

export async function GET(req: Request, { params }: { params: { socmedId: string } }) {
  try {
    if (!params.socmedId) {
      return new NextResponse("socmed id is required", { status: 400 });
    }

    const socmed = await db.socmed.findUnique({
      where: {
        id: params.socmedId,
      },
    });

    return NextResponse.json(socmed);
  } catch (error) {
    console.log("[SOCIAL-MEDIA_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { socmedId: string; protectId: string } }) {
  try {
    const user = auth();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.socmedId) {
      return new NextResponse("socmed id is required", { status: 400 });
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

    const socmed = await db.socmed.delete({
      where: {
        id: params.socmedId,
      },
    });

    return NextResponse.json(socmed);
  } catch (error) {
    console.log("[SOCIAL-MEDIA_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { socmedId: string; protectId: string } }) {
  try {
    const user = auth();

    const body = await req.json();

    const { siteName, siteUrl, imageUrl } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!siteName) {
      return new NextResponse("siteName is required", { status: 400 });
    }

    if (!siteUrl) {
      return new NextResponse("siteUrl is required", { status: 400 });
    }

    /**
    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }
    */

    if (!params.socmedId) {
      return new NextResponse("socmed id is required", { status: 400 });
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

    const socmed = await db.socmed.update({
      where: {
        id: params.socmedId,
      },
      data: {
        siteName,
        siteUrl,
        imageUrl,
      },
    });

    return NextResponse.json(socmed);
  } catch (error) {
    console.log("[SOCIAL-MEDIA_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
