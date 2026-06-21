"use strict";
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

// Build providers list dynamically — only add OAuth if credentials are configured
const providers: NextAuthConfig["providers"] = [];

// Google OAuth (only if configured)
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

// GitHub OAuth (only if configured)
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  );
}

// Credentials (always available)
providers.push(
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "you@example.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email as string,
        }
      });

      if (!user || !user.passwordHash) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(
        credentials.password as string,
        user.passwordHash
      );

      if (!isPasswordValid) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      };
    }
  })
);

export const authOptions: NextAuthConfig = {
  providers,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
      }
      
      // Handle session updates (e.g., when completing onboarding)
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      if (trigger === "update" && session?.image) {
        token.picture = session.image;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        if (!user.email) return false;
        
        // Find existing user or create a new one
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email }
        });
        
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || user.email.split("@")[0],
              image: user.image,
              provider: account.provider,
            }
          });
        }
      }
      return true;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true, // Required for Cloud Run / non-Vercel deployments
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
