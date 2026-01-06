import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    // Get email from query params if provided
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

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

    // If email is provided, check that specific user
    let specificUser = null;
    if (email) {
      specificUser = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          emailVerified: true,
          password: true,
          createdAt: true,
          updatedAt: true,
        }
      });
    }

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
        specificUser: specificUser ? {
          id: specificUser.id,
          email: specificUser.email,
          emailVerified: !!specificUser.emailVerified,
          hasPassword: !!specificUser.password,
          createdAt: specificUser.createdAt,
          updatedAt: specificUser.updatedAt,
        } : email ? 'User not found' : null,
        environment: {
          nodeEnv: process.env.NODE_ENV,
          nextAuthUrl: process.env.NEXTAUTH_URL,
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
