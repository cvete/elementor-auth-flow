import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        emailVerified: true,
        // Don't return password
      }
    });

    if (user) {
      return NextResponse.json({
        exists: true,
        user: {
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          emailVerified: user.emailVerified
        }
      });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error: any) {
    console.error('Check user error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
