import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL_value: process.env.NEXTAUTH_URL || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    // Show partial values to verify format (safely)
    DATABASE_URL_format: process.env.DATABASE_URL ?
      `${process.env.DATABASE_URL.substring(0, 15)}...${process.env.DATABASE_URL.substring(process.env.DATABASE_URL.length - 20)}` :
      'NOT SET',
    NEXTAUTH_SECRET_length: process.env.NEXTAUTH_SECRET?.length || 0
  };

  return NextResponse.json({
    message: 'Environment variables check',
    variables: envCheck,
    warnings: [
      !process.env.NEXTAUTH_URL && 'NEXTAUTH_URL is not set',
      !process.env.NEXTAUTH_SECRET && 'NEXTAUTH_SECRET is not set',
      process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length < 32 && 'NEXTAUTH_SECRET is too short (should be 32+ characters)'
    ].filter(Boolean)
  });
}
