-- Create ads table
CREATE TABLE IF NOT EXISTS "Ad" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "placement" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "htmlCode" TEXT,
  "imageUrl" TEXT,
  "linkUrl" TEXT,
  "width" INTEGER,
  "height" INTEGER,
  "enabled" BOOLEAN NOT NULL DEFAULT true,
  "startDate" TIMESTAMP,
  "endDate" TIMESTAMP,
  "weight" INTEGER NOT NULL DEFAULT 1,
  "impressions" INTEGER NOT NULL DEFAULT 0,
  "clicks" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
