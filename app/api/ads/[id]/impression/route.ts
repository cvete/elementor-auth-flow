import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST /api/ads/:id/impression - Track ad impression
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ad = await prisma.ad.update({
      where: { id: params.id },
      data: {
        impressions: {
          increment: 1,
        },
      },
      select: {
        id: true,
        impressions: true,
      },
    })

    return NextResponse.json({ success: true, impressions: ad.impressions })
  } catch (error) {
    console.error("Error tracking impression:", error)
    return NextResponse.json(
      { error: "Failed to track impression" },
      { status: 500 }
    )
  }
}
