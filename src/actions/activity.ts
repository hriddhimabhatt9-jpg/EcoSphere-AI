"use server";

/**
 * @module activity
 * @description Server actions for logging user eco-activities.
 */

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { calculateTransportEmissions, calculateDietEmissions, calculateEnergyEmissions } from "@/lib/calculator";

const logActivitySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category: z.enum(["TRANSPORT", "FOOD", "ENERGY", "WASTE", "SHOPPING"]),
  description: z.string().optional(),
  impactAmount: z.coerce.number(), // Amount of CO2e saved or generated
});

/**
 * Logs a new user activity and calculates XP earned.
 * Runs in a transaction to update both the activity log and the user's profile level.
 * @param {FormData} formData - The submitted form data containing title, category, description, and impactAmount
 * @returns {Promise<{ success?: boolean, error?: string, fieldErrors?: Object, xpEarned?: number }>} The result of the activity logging operation
 */
export async function logActivity(formData: FormData) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { error: "Unauthorized. Please log in." };
    }

    const userId = session.user.id;

    const rawData = {
      title: formData.get("title"),
      category: formData.get("category"),
      description: formData.get("description") || "",
      impactAmount: formData.get("impactAmount"),
    };

    const validatedData = logActivitySchema.safeParse(rawData);

    if (!validatedData.success) {
      return { 
        error: "Invalid input data", 
        fieldErrors: validatedData.error.flatten().fieldErrors 
      };
    }

    const { title, category, description, impactAmount } = validatedData.data;

    // Calculate XP based on impact (simplified for now)
    // 1 kg CO2e saved = ~10 XP
    const xpEarned = Math.max(Math.round(impactAmount * 10), 10);

    // Run within a transaction to update both activity and profile
    await prisma.$transaction(async (tx) => {
      // 1. Create the activity
      await tx.activity.create({
        data: {
          userId,
          title,
          category,
          description,
          impactAmount,
          xpEarned,
        },
      });

      // 2. Update user profile XP and Level
      const profile = await tx.profile.findUnique({
        where: { userId },
      });

      if (profile) {
        const newXp = profile.xp + xpEarned;
        // Simple level curve: Level = floor(sqrt(XP / 100)) + 1
        const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;

        await tx.profile.update({
          where: { userId },
          data: {
            xp: newXp,
            level: newLevel,
          },
        });
      }
    });

    return { success: true, xpEarned };
  } catch (error) {
    console.error("Log activity error:", error);
    return { error: "Failed to log activity. Please try again." };
  }
}
