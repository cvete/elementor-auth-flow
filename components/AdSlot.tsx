"use client"

import { useEffect, useState } from "react"

interface Ad {
  id: string
  placement: string
  title: string
  htmlCode: string | null
  imageUrl: string | null
  linkUrl: string | null
  width: number | null
  height: number | null
  enabled: boolean
  startDate: string | null
  endDate: string | null
  weight: number
  impressions: number
  clicks: number
}

interface AdSlotProps {
  placement: "player_top" | "player_sidebar_1" | "player_sidebar_2" | "dashboard_top" | "dashboard_middle" | "dashboard_sidebar"
  className?: string
}

export function AdSlot({ placement, className = "" }: AdSlotProps) {
  const [ad, setAd] = useState<Ad | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAd()
  }, [placement])

  const loadAd = async () => {
    try {
      setLoading(true)

      // Fetch active ads for this placement
      const response = await fetch(
        `/api/ads?placement=${placement}&active=true`
      )
      const data = await response.json()

      if (data.ads && data.ads.length > 0) {
        // Select ad using weighted random selection
        const selectedAd = selectWeightedRandom(data.ads)
        setAd(selectedAd)

        // Track impression
        if (selectedAd) {
          trackImpression(selectedAd.id)
        }
      } else {
        setAd(null)
      }
    } catch (error) {
      console.error("Error loading ad:", error)
      setAd(null)
    } finally {
      setLoading(false)
    }
  }

  // Weighted random selection algorithm
  const selectWeightedRandom = (ads: Ad[]): Ad | null => {
    if (ads.length === 0) return null

    // Calculate total weight
    const totalWeight = ads.reduce((sum, ad) => sum + ad.weight, 0)

    // Generate random number between 0 and totalWeight
    let random = Math.random() * totalWeight

    // Select ad based on weight
    for (const ad of ads) {
      random -= ad.weight
      if (random <= 0) {
        return ad
      }
    }

    // Fallback to first ad
    return ads[0]
  }

  const trackImpression = async (adId: string) => {
    try {
      await fetch(`/api/ads/${adId}/impression`, {
        method: "POST",
      })
    } catch (error) {
      console.error("Error tracking impression:", error)
    }
  }

  const trackClick = async (adId: string) => {
    try {
      await fetch(`/api/ads/${adId}/click`, {
        method: "POST",
      })
    } catch (error) {
      console.error("Error tracking click:", error)
    }
  }

  const handleAdClick = () => {
    if (ad) {
      trackClick(ad.id)
      if (ad.linkUrl) {
        window.open(ad.linkUrl, "_blank", "noopener,noreferrer")
      }
    }
  }

  // Determine responsive styles based on placement
  const getPlacementStyles = () => {
    switch (placement) {
      case "player_top":
      case "dashboard_top":
        return {
          container: "w-full",
          placeholder: "min-h-[90px] md:min-h-[90px]",
          image: "max-w-full mx-auto"
        }
      case "player_sidebar_1":
      case "player_sidebar_2":
        return {
          container: "w-full max-w-[336px]",
          placeholder: "h-[226px]",
          image: "max-w-[336px] mx-auto"
        }
      case "dashboard_middle":
        return {
          container: "w-full",
          placeholder: "min-h-[250px]",
          image: "max-w-full mx-auto"
        }
      case "dashboard_sidebar":
        return {
          container: "w-full",
          placeholder: "min-h-[600px]",
          image: "max-w-full mx-auto"
        }
      default:
        return {
          container: "w-full",
          placeholder: "min-h-[200px]",
          image: "max-w-full mx-auto"
        }
    }
  }

  const styles = getPlacementStyles()

  if (loading) {
    return (
      <div className={`ad-slot ad-slot-${placement} ${styles.container} ${className}`}>
        <div className={`ad-placeholder animate-pulse bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-sm ${styles.placeholder}`}>
          Loading...
        </div>
      </div>
    )
  }

  if (!ad) {
    return (
      <div className={`ad-slot ad-slot-${placement} ${styles.container} ${className}`}>
        <div className={`ad-placeholder bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm ${styles.placeholder}`}>
          Advertisement
        </div>
      </div>
    )
  }

  return (
    <div className={`ad-slot ad-slot-${placement} ${styles.container} ${className}`}>
      <div className="ad-content w-full">
        {ad.htmlCode ? (
          // Render HTML ad code
          <div
            className="ad-html w-full overflow-hidden rounded-lg"
            dangerouslySetInnerHTML={{ __html: ad.htmlCode }}
          />
        ) : ad.imageUrl ? (
          // Render image ad
          <div
            className={`ad-image ${ad.linkUrl ? "cursor-pointer hover:opacity-90 transition-opacity" : ""} ${styles.image}`}
            onClick={handleAdClick}
          >
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full h-auto rounded-lg shadow-sm"
              style={{
                maxWidth: ad.width || undefined,
                maxHeight: ad.height || undefined,
              }}
              loading="lazy"
            />
          </div>
        ) : (
          // Fallback placeholder
          <div className={`ad-placeholder bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-sm ${styles.placeholder}`}>
            {ad.title}
          </div>
        )}
      </div>
    </div>
  )
}
