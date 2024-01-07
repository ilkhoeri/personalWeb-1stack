import { NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import db from "@/lib/db";

export async function POST(req: Request, { params }: { params: { protectId: string } }) {
  try {
    const user = auth();

    const body = await req.json();

    const { slug, heading, markHead, sections, notes, isNew } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.protectId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!slug) {
      return new NextResponse("PARAMS URL is required", { status: 400 });
    }

    if (!heading) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!sections || !sections.length) {
      return new NextResponse("Description are required", { status: 400 });
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

    const paramsData = await db.params.create({
      data: {
        slug,
        heading,
        markHead,
        notes,
        isNew,
        userId: params.protectId,
        sections: {
          createMany: {
            data: [...sections.map((section: { node: string }) => section)],
          },
        },
      },
    });

    return NextResponse.json(paramsData);
  } catch (error) {
    console.log("[PARAMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { protectId: string } }) {
  try {
    if (!params.protectId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const paramsData = await db.params.findMany({
      where: {
        userId: params.protectId,
      },
    });

    return NextResponse.json(paramsData);
  } catch (error) {
    console.log("[PARAMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
