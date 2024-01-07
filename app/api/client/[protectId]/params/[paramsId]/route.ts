import { NextResponse } from "next/server";
import { auth } from "@/auth/auth";

import db from "@/lib/db";

export async function GET(req: Request, { params }: { params: { paramsId: string } }) {
  try {
    if (!params.paramsId) {
      return new NextResponse("Params id is required", { status: 400 });
    }

    const paramsData = await db.params.findUnique({
      where: {
        id: params.paramsId,
      },
    });

    return NextResponse.json(paramsData);
  } catch (error) {
    console.log("[PARAMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { paramsId: string; protectId: string } }) {
  try {
    const user = auth();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.paramsId) {
      return new NextResponse("Params id is required", { status: 400 });
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

    const paramsData = await db.params.delete({
      where: {
        id: params.paramsId,
      },
    });

    return NextResponse.json(paramsData);
  } catch (error) {
    console.log("[PARAMS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { paramsId: string; protectId: string } }) {
  try {
    const user = auth();

    const body = await req.json();

    const { slug, heading, markHead, sections, notes, isNew } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 });
    }

    if (!heading) {
      return new NextResponse("Heading is required", { status: 400 });
    }

    if (!sections || !sections.length) {
      return new NextResponse("Sections URL is required", { status: 400 });
    }

    if (!params.paramsId) {
      return new NextResponse("Params id is required", { status: 400 });
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

    await db.params.update({
      where: {
        id: params.paramsId,
      },
      data: {
        slug,
        heading,
        markHead,
        sections: {
          deleteMany: {},
        },
        notes,
        isNew,
      },
    });

    const paramsData = await db.params.update({
      where: {
        id: params.paramsId,
      },
      data: {
        sections: {
          createMany: {
            data: [...sections.map((section: { node: string }) => section)],
          },
        },
      },
    });

    return NextResponse.json(paramsData);
  } catch (error) {
    console.log("[PARAMS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
