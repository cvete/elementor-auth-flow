import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// POST /api/ads/:id/click - Track ad click
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const ad = await prisma.ad.update({
      where: { id },
      data: {
        clicks: {
          increment: 1,
        },
      },
      select: {
        id: true,
        clicks: true,
      },
    })

    return NextResponse.json({ success: true, clicks: ad.clicks })
  } catch (error) {
    console.error("Error tracking click:", error)
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    )
  }
}
