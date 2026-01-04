import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
      }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
        email
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    return NextResponse.json({
      success: passwordMatch,
      message: passwordMatch ? 'Password matches!' : 'Password does not match',
      debug: {
        userExists: true,
        userEmail: user.email,
        userName: user.name,
        hasPassword: !!user.password,
        passwordLength: user.password?.length,
        inputPasswordLength: password.length,
        bcryptHashFormat: user.password?.startsWith('$2a$') || user.password?.startsWith('$2b$'),
      }
    });
  } catch (error: any) {
    console.error('Test login error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
