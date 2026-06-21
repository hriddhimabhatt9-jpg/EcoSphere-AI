"use server";

/**
 * @module auth
 * @description Server actions for authentication (login and registration).
 */

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/**
 * Registers a new user with email and password.
 * Hashes the password using bcryptjs and stores the user in the database.
 * @param {FormData} formData - The submitted form data containing name, email, and password
 * @returns {Promise<{ success?: boolean, error?: string, fieldErrors?: Object }>} The result of the registration process
 */
export async function registerUser(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = registerSchema.safeParse(rawData);

    if (!validatedData.success) {
      return { 
        error: "Invalid input data", 
        fieldErrors: validatedData.error.flatten().fieldErrors 
      };
    }

    const { name, email, password } = validatedData.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        provider: "email",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
