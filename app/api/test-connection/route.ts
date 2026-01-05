import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count();

    // Test if we can query a user
    const firstUser = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        emailVerified: true,
        createdAt: true,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        userCount,
        sampleUser: firstUser ? {
          id: firstUser.id,
          email: firstUser.email,
          emailVerified: !!firstUser.emailVerified,
          createdAt: firstUser.createdAt,
        } : null,
        environment: {
          nodeEnv: process.env.NODE_ENV,
          hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
          hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
          hasDatabaseUrl: !!process.env.DATABASE_URL,
        }
      }
    });
  } catch (error: any) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 });
  }
}
