import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
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
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Attempting to authorize with email:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string
          }
        })
        console.log("User found in DB:", user);

        if (!user || !user.password) {
          console.log("User not found or no password set");
          return null
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )
        console.log("Password match result:", passwordMatch);

        if (!passwordMatch) {
          console.log("Password does not match");
          return null
        }

        // Check if email is verified (optional - log warning but allow login)
        if (!user.emailVerified) {
          console.log("Warning: Email not verified for user:", user.email);
          // Allow login but user should verify email later
          // Uncomment the line below to enforce email verification:
          // throw new Error("Please verify your email before logging in. Check your inbox for the verification link.");
        }

        console.log("Authorization successful");
        return {
          id: user.id,
          email: user.email,
          name: user.name,
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
          }
        } catch (error) {
          console.error("Error in Google sign-in:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      // For Google login, fetch user from database
      if (account?.provider === "google" && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email }
        })
        if (dbUser) {
          token.id = dbUser.id
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
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
