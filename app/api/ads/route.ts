import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET /api/ads - List all ads with optional filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const placement = searchParams.get("placement")
    const enabled = searchParams.get("enabled")

    const where: any = {}

    if (placement) {
      where.placement = placement
    }

    if (enabled !== null) {
      where.enabled = enabled === "true"
    }

    // Filter by active date range
    const now = new Date()
    if (searchParams.get("active") === "true") {
      where.enabled = true
      where.OR = [
        { startDate: null, endDate: null },
        { startDate: { lte: now }, endDate: null },
        { startDate: null, endDate: { gte: now } },
        { startDate: { lte: now }, endDate: { gte: now } },
      ]
    }

    const ads = await prisma.ad.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ ads })
  } catch (error) {
    console.error("Error fetching ads:", error)
    return NextResponse.json(
      { error: "Failed to fetch ads" },
      { status: 500 }
    )
  }
}

// POST /api/ads - Create new ad (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    if (session.user.email !== "maceski.cvete@gmail.com") {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const {
      placement,
      title,
      htmlCode,
      imageUrl,
      linkUrl,
      width,
      height,
      enabled,
      startDate,
      endDate,
      weight,
    } = body

    // Validate required fields
    if (!placement || !title) {
      return NextResponse.json(
        { error: "Placement and title are required" },
        { status: 400 }
      )
    }

    // Validate placement
    const validPlacements = ["player_top", "player_sidebar_1", "player_sidebar_2"]
    if (!validPlacements.includes(placement)) {
      return NextResponse.json(
        { error: "Invalid placement" },
        { status: 400 }
      )
    }

    // Create ad
    const ad = await prisma.ad.create({
      data: {
        placement,
        title,
        htmlCode: htmlCode || null,
        imageUrl: imageUrl || null,
        linkUrl: linkUrl || null,
        width: width || null,
        height: height || null,
        enabled: enabled ?? true,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        weight: weight ?? 1,
      },
    })

    return NextResponse.json({ ad }, { status: 201 })
  } catch (error) {
    console.error("Error creating ad:", error)
    return NextResponse.json(
      { error: "Failed to create ad" },
      { status: 500 }
    )
  }
}
