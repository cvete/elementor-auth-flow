import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const isProduction = process.env.NODE_ENV === 'production'

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !isProduction,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("[AUTH] Attempting to authorize with email:", credentials?.email);
        console.log("[AUTH] Environment check:", {
          hasDbUrl: !!process.env.DATABASE_URL,
          nodeEnv: process.env.NODE_ENV,
        });

        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH] Missing email or password");
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string
            }
          })
          console.log("[AUTH] User found in DB:", user ? { id: user.id, email: user.email, hasPassword: !!user.password } : null);

          if (!user || !user.password) {
            console.log("[AUTH] User not found or no password set");
            return null
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          console.log("[AUTH] Password match result:", passwordMatch);

          if (!passwordMatch) {
            console.log("[AUTH] Password does not match");
            return null
          }

          // Check if email is verified (required for login)
          if (!user.emailVerified) {
            console.log("[AUTH] Email not verified for user:", user.email);
            throw new Error("Please verify your email before logging in. Check your inbox for the verification link.");
          }

          console.log("[AUTH] Authorization successful for user:", user.id);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error: any) {
          console.error("[AUTH] Database error during authorization:", error.message);
          console.error("[AUTH] Full error:", error);
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("[AUTH CALLBACK] signIn called", {
        userId: user?.id,
        userEmail: user?.email,
        provider: account?.provider
      });

      if (account?.provider === "google") {
        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          if (!existingUser) {
            // Create new user for Google sign-in
            await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name,
                image: user.image,
                emailVerified: new Date(),
                password: "", // Google users don't have a password
              }
            })
            console.log("[AUTH CALLBACK] Created new Google user:", user.email);
          } else if (!existingUser.emailVerified) {
            // Update email verification if user exists but wasn't verified
            await prisma.user.update({
              where: { email: user.email! },
              data: {
                emailVerified: new Date(),
                image: user.image || existingUser.image,
                name: user.name || existingUser.name,
              }
            })
            console.log("[AUTH CALLBACK] Updated existing Google user:", user.email);
          }
        } catch (error) {
          console.error("[AUTH CALLBACK] Error in Google sign-in:", error)
          return false
        }
      }

      console.log("[AUTH CALLBACK] signIn returning true");
      return true
    },
    async jwt({ token, user, account }) {
      console.log("[AUTH CALLBACK] jwt called", {
        hasToken: !!token,
        hasUser: !!user,
        provider: account?.provider
      });

      if (user) {
        token.id = user.id
        console.log("[AUTH CALLBACK] Added user.id to token:", user.id);
      }
      // For Google login, fetch user from database
      if (account?.provider === "google" && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email }
        })
        if (dbUser) {
          token.id = dbUser.id
          console.log("[AUTH CALLBACK] Added dbUser.id to token for Google:", dbUser.id);
        }
      }
      return token
    },
    async session({ session, token }) {
      console.log("[AUTH CALLBACK] session called", {
        hasSession: !!session,
        hasToken: !!token,
        tokenId: token?.id
      });

      if (session.user) {
        session.user.id = token.id as string
        console.log("[AUTH CALLBACK] Added token.id to session.user:", token.id);
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
})
