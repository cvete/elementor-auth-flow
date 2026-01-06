import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET /api/ads/:id - Get single ad
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const ad = await prisma.ad.findUnique({
      where: { id },
    })

    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 })
    }

    return NextResponse.json({ ad })
  } catch (error) {
    console.error("Error fetching ad:", error)
    return NextResponse.json(
      { error: "Failed to fetch ad" },
      { status: 500 }
    )
  }
}

// PUT /api/ads/:id - Update ad (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // Validate placement if provided
    if (placement) {
      const validPlacements = ["player_top", "player_sidebar_1", "player_sidebar_2", "dashboard_top", "dashboard_middle", "dashboard_sidebar"]
      if (!validPlacements.includes(placement)) {
        return NextResponse.json(
          { error: "Invalid placement" },
          { status: 400 }
        )
      }
    }

    // Update ad
    const ad = await prisma.ad.update({
      where: { id },
      data: {
        ...(placement && { placement }),
        ...(title && { title }),
        ...(htmlCode !== undefined && { htmlCode: htmlCode || null }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
        ...(linkUrl !== undefined && { linkUrl: linkUrl || null }),
        ...(width !== undefined && { width: width || null }),
        ...(height !== undefined && { height: height || null }),
        ...(enabled !== undefined && { enabled }),
        ...(startDate !== undefined && { startDate: startDate ? new Date(startDate) : null }),
        ...(endDate !== undefined && { endDate: endDate ? new Date(endDate) : null }),
        ...(weight !== undefined && { weight }),
      },
    })

    return NextResponse.json({ ad })
  } catch (error) {
    console.error("Error updating ad:", error)
    return NextResponse.json(
      { error: "Failed to update ad" },
      { status: 500 }
    )
  }
}

// DELETE /api/ads/:id - Delete ad (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    if (session.user.email !== "maceski.cvete@gmail.com") {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 })
    }

    await prisma.ad.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting ad:", error)
    return NextResponse.json(
      { error: "Failed to delete ad" },
      { status: 500 }
    )
  }
}
