"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const profileSchema = z.object({
  transportMode: z.string(),
  dailyCommute: z.coerce.number().min(0),
  dietType: z.string(),
  mealPrep: z.string(),
  energySource: z.string(),
  housingType: z.string(),
  householdSize: z.coerce.number().min(1),
  shoppingHabits: z.string(),
  wasteRecycling: z.coerce.boolean(),
  wasteComposting: z.coerce.boolean(),
});

export async function completeOnboarding(formData: FormData) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return { error: "Unauthorized. Please log in first." };
    }

    const userId = session.user.id;

    const rawData = {
      transportMode: formData.get("transportMode"),
      dailyCommute: formData.get("dailyCommute"),
      dietType: formData.get("dietType"),
      mealPrep: formData.get("mealPrep"),
      energySource: formData.get("energySource"),
      housingType: formData.get("housingType"),
      householdSize: formData.get("householdSize"),
      shoppingHabits: formData.get("shoppingHabits"),
      wasteRecycling: formData.get("wasteRecycling") === "true",
      wasteComposting: formData.get("wasteComposting") === "true",
    };

    const validatedData = profileSchema.safeParse(rawData);

    if (!validatedData.success) {
      return { 
        error: "Invalid input data", 
        fieldErrors: validatedData.error.flatten().fieldErrors 
      };
    }

    // Baseline calculation based on simple averages to establish starting score
    // In a real app, this would use a more complex algorithm calling the carbon calculation engine
    let initialScore = 50; 
    
    if (validatedData.data.dietType === "vegan") initialScore += 10;
    if (validatedData.data.transportMode === "public" || validatedData.data.transportMode === "bike") initialScore += 10;
    if (validatedData.data.energySource === "full_renewable") initialScore += 15;
    if (validatedData.data.wasteRecycling && validatedData.data.wasteComposting) initialScore += 5;

    // Create or update profile
    await prisma.profile.upsert({
      where: { userId },
      update: {
        ...validatedData.data,
        carbonScore: initialScore,
      },
      create: {
        userId,
        ...validatedData.data,
        carbonScore: initialScore,
      },
    });

    // Mark user as onboarding complete
    await prisma.user.update({
      where: { id: userId },
      data: { onboardingComplete: true },
    });

    return { success: true };
  } catch (error) {
    console.error("Onboarding error:", error);
    return { error: "Something went wrong saving your profile." };
  }
}

export async function forgotPassword(email: string) {
  try {
    // In a real application, you would generate a token and send an email here.
    // For this implementation, we will simulate the process.
    const user = await prisma.user.findUnique({ where: { email } });
    
    // Always return success to prevent email enumeration attacks
    return { success: true };
  } catch (error) {
    console.error("Forgot password error:", error);
    return { error: "Failed to process request." };
  }
}
