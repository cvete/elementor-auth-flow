# Advertisement Management System - User Guide

## Overview
The advertisement management system allows you to display and manage ads across your TV streaming platform with three strategic placements:
- **player_top**: Horizontal ad above the video player (728×90 recommended)
- **player_sidebar_1**: First vertical ad in the right sidebar (300×250 recommended)
- **player_sidebar_2**: Second vertical ad in the right sidebar (300×250 recommended)

## Features
✅ **Admin Panel** - Manage ads at `/admin/ads`
✅ **Weighted Rotation** - Control ad frequency with weight values
✅ **Date Scheduling** - Set start/end dates for campaigns
✅ **Multiple Ad Types** - Support for HTML code and image ads
✅ **Click & Impression Tracking** - Monitor ad performance
✅ **Responsive Design** - Mobile-friendly ad display
✅ **Lazy Loading** - Optimized performance

## Getting Started

### 1. Access Admin Panel
Navigate to: `http://localhost:3000/admin/ads` (or your production URL)

### 2. Create Your First Ad

Click "Create Ad" and fill in the form:

#### Required Fields:
- **Placement**: Choose where the ad appears (player_top, player_sidebar_1, player_sidebar_2)
- **Title**: Internal name for the ad (e.g., "Summer Sale Banner")

#### Ad Content (Choose ONE):
- **HTML Code**: Paste third-party ad code (Google AdSense, etc.)
- **Image URL**: Direct link to your ad image (e.g., https://example.com/banner.jpg)

#### Optional Fields:
- **Link URL**: Where users go when clicking the ad
- **Width/Height**: Maximum dimensions in pixels (e.g., 728×90)
- **Start Date**: When the ad becomes active
- **End Date**: When the ad expires
- **Weight**: Priority for rotation (higher = shown more often)
- **Status**: Enable/disable the ad

### 3. Ad Rotation Logic

The system uses **weighted random selection**:
- Ad with weight 3 is shown 3× more than ad with weight 1
- Only enabled ads with valid date ranges are shown
- If no ads match, a placeholder is displayed

### 4. Tracking Performance

View metrics in the admin panel:
- **Impressions**: How many times the ad was shown (👁️ icon)
- **Clicks**: How many times users clicked the ad (🖱️ icon)

## Ad Specifications

### Recommended Sizes:

**Player Top (Horizontal)**
- Desktop: 728×90 (Leaderboard)
- Mobile: 320×50 (Mobile Banner)

**Sidebar Ads (Vertical)**
- Desktop: 300×250 (Medium Rectangle)
- Mobile: Full width (stacks below player)

### Ad Types:

**1. Image Ads**
- Upload your image to a hosting service
- Enter the image URL in "Image URL" field
- Optionally add "Link URL" for click destination
- Set dimensions to maintain aspect ratio

**2. HTML Ads**
- Paste third-party ad code (AdSense, etc.) in "HTML Code" field
- The code will be rendered as-is
- Useful for dynamic ad networks

## API Endpoints

For programmatic access:

### List Ads
```
GET /api/ads
GET /api/ads?placement=player_top
GET /api/ads?active=true
```

### Create Ad
```
POST /api/ads
Content-Type: application/json

{
  "placement": "player_top",
  "title": "My Ad",
  "imageUrl": "https://example.com/ad.jpg",
  "linkUrl": "https://example.com",
  "enabled": true,
  "weight": 1
}
```

### Update Ad
```
PUT /api/ads/:id
Content-Type: application/json
```

### Delete Ad
```
DELETE /api/ads/:id
```

### Track Impression
```
POST /api/ads/:id/impression
```

### Track Click
```
POST /api/ads/:id/click
```

## Integration

The ad slots are already integrated into your channel player pages at:
- `/components/ChannelWatchClient.tsx`

The AdSlot component automatically:
1. Fetches active ads for the placement
2. Selects an ad using weighted random selection
3. Tracks impressions when displayed
4. Tracks clicks when users interact
5. Shows placeholder if no ads available

## Best Practices

1. **Test First**: Create a test ad with a simple image to verify setup
2. **Set Weights**: Use weight 1 for equal rotation, higher for priority ads
3. **Use Dates**: Schedule seasonal campaigns with start/end dates
4. **Monitor Metrics**: Check impressions/clicks regularly to optimize
5. **Mobile Testing**: Preview ads on mobile devices for responsive behavior
6. **Ad Quality**: Use high-quality images at recommended dimensions
7. **Link Safety**: Always use HTTPS URLs for images and links

## Troubleshooting

**Ad Not Showing?**
- Check if ad is enabled (Status toggle)
- Verify date range (start/end dates)
- Ensure imageUrl or htmlCode is provided
- Check browser console for errors

**Poor Performance?**
- Use lazy loading (already enabled)
- Optimize image sizes (compress images)
- Avoid heavy HTML/JavaScript in ad code

**Tracking Not Working?**
- Check browser network tab for API calls
- Verify ad ID is correct
- Ensure /api/ads/:id/impression endpoint is accessible

## Security Notes

- All ad creation/editing requires authentication
- HTML ads are rendered with `dangerouslySetInnerHTML` (use trusted sources only)
- Click links open in new tab with `noopener,noreferrer` for security

## Future Enhancements

Potential features to add:
- Image upload (currently uses URLs only)
- A/B testing
- Geographic targeting
- Device targeting (mobile vs desktop)
- Advanced analytics dashboard
- Revenue tracking

## Support

For questions or issues, check:
- Component: `/components/AdSlot.tsx`
- Admin Panel: `/app/admin/ads/page.tsx`
- API Routes: `/app/api/ads/`
- Database Schema: `/prisma/schema.prisma` (Ad model)
