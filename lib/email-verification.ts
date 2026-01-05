import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

/**
 * Generate a secure random token for email verification
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create an email verification token
 */
export async function createVerificationToken(email: string): Promise<string | null> {
  try {
    // Generate token
    const token = generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Token expires in 24 hours

    // Delete any existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // Create new verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: expiresAt,
      },
    });

    return token;
  } catch (error) {
    console.error('Error creating verification token:', error);
    return null;
  }
}

/**
 * Validate an email verification token
 */
export async function validateVerificationToken(token: string): Promise<{ valid: boolean; email?: string }> {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return { valid: false };
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: { token },
      });
      return { valid: false };
    }

    return { valid: true, email: verificationToken.identifier };
  } catch (error) {
    console.error('Error validating verification token:', error);
    return { valid: false };
  }
}

/**
 * Verify user email with token
 */
export async function verifyEmailWithToken(token: string): Promise<boolean> {
  try {
    // Validate token
    const validation = await validateVerificationToken(token);
    if (!validation.valid || !validation.email) {
      return false;
    }

    // Update user's emailVerified field
    await prisma.user.update({
      where: { email: validation.email },
      data: {
        emailVerified: new Date(),
      },
    });

    // Delete the used token
    await prisma.verificationToken.delete({
      where: { token },
    });

    return true;
  } catch (error) {
    console.error('Error verifying email:', error);
    return false;
  }
}
