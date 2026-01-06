const { Pool } = require('pg')
require('dotenv').config()

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  })

  try {
    console.log('Creating ads table...')

    // Create ads table using raw SQL
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Ad" (
        "id" TEXT NOT NULL,
        "placement" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "htmlCode" TEXT,
        "imageUrl" TEXT,
        "linkUrl" TEXT,
        "width" INTEGER,
        "height" INTEGER,
        "enabled" BOOLEAN NOT NULL DEFAULT true,
        "startDate" TIMESTAMP(3),
        "endDate" TIMESTAMP(3),
        "weight" INTEGER NOT NULL DEFAULT 1,
        "impressions" INTEGER NOT NULL DEFAULT 0,
        "clicks" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
      )
    `)

    console.log('✅ Ads table created successfully!')

    // Verify table exists by querying it
    const result = await pool.query('SELECT COUNT(*) FROM "Ad"')
    console.log(`✅ Table verified! Current ad count: ${result.rows[0].count}`)

  } catch (error) {
    console.error('❌ Error creating ads table:', error.message)
    throw error
  } finally {
    await pool.end()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
