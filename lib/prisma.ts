import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pool: Pool | undefined
}

// Initialize connection pool
if (!globalForPrisma.pool) {
  globalForPrisma.pool = new Pool({
    connectionString: process.env.DATABASE_URL
  })
}

// Create Prisma adapter
const adapter = new PrismaPg(globalForPrisma.pool)

// Initialize Prisma client for PostgreSQL
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter,
  log: ['query', 'error', 'warn'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
