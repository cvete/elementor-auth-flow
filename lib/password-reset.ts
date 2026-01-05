import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

/**
 * Generate a secure random token for password reset
 */
export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Store the password reset token in the database
 */
export async function createPasswordResetToken(email: string): Promise<string | null> {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Return null but don't expose that user doesn't exist (security)
      return null;
    }

    // Generate token
    const token = generateResetToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    // Update user with reset token
    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: token,
        passwordResetTokenExpires: expiresAt,
      },
    });

    return token;
  } catch (error) {
    console.error('Error creating password reset token:', error);
    return null;
  }
}

/**
 * Validate a password reset token
 */
export async function validateResetToken(token: string): Promise<{ valid: boolean; email?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { passwordResetToken: token },
    });

    if (!user) {
      return { valid: false };
    }

    // Check if token is expired
    if (!user.passwordResetTokenExpires || user.passwordResetTokenExpires < new Date()) {
      return { valid: false };
    }

    return { valid: true, email: user.email };
  } catch (error) {
    console.error('Error validating reset token:', error);
    return { valid: false };
  }
}

/**
 * Reset password using token
 */
export async function resetPasswordWithToken(token: string, newPassword: string): Promise<boolean> {
  try {
    const bcrypt = require('bcryptjs');

    // Validate token
    const validation = await validateResetToken(token);
    if (!validation.valid || !validation.email) {
      return false;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await prisma.user.update({
      where: { email: validation.email },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpires: null,
      },
    });

    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    return false;
  }
}
