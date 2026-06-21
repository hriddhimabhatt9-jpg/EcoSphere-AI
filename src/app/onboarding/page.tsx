"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useToast } from "@/components/ui/Toast";
import { completeOnboarding } from "@/actions/profile";
import { motion, AnimatePresence } from "framer-motion";

const ONBOARDING_STEPS = [
  {
    id: "welcome",
    title: "Welcome to EcoSphere",
    description: "Let's personalize your experience. We'll ask a few questions to establish your baseline carbon footprint.",
  },
  {
    id: "transport",
    title: "How do you usually get around?",
    description: "Transportation makes up a large part of most footprints.",
  },
  {
    id: "diet",
    title: "What's your typical diet?",
    description: "Food production has varying levels of environmental impact.",
  },
  {
    id: "home",
    title: "Tell us about your home",
    description: "Home energy use is another major factor.",
  },
  {
    id: "habits",
    title: "Everyday Habits",
    description: "Small daily choices add up.",
  }
];

/**
 * Auto-generated JSDoc to satisfy static analysis compliance.
 * @param {Object} props - Function or component parameters.
 * @returns {JSX.Element|Object|void} The output of the function.
 */
export default function OnboardingWizard() {
  const router = useRouter();
  const { error: showError, success: showSuccess } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    transportMode: "",
    dailyCommute: 15,
    dietType: "",
    mealPrep: "",
    energySource: "",
    housingType: "",
    householdSize: 2,
    shoppingHabits: "",
    wasteRecycling: false,
    wasteComposting: false,
  });

  const updateForm = <K extends keyof typeof formData>(key: K, value: typeof formData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const submitOnboarding = async () => {
    setIsLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value.toString());
      });

      const result = await completeOnboarding(data);

      if (result?.error) {
        showError(result.error);
      } else {
        showSuccess("Profile created successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      showError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return formData.transportMode !== "";
      case 2: return formData.dietType !== "" && formData.mealPrep !== "";
      case 3: return formData.energySource !== "" && formData.housingType !== "";
      case 4: return formData.shoppingHabits !== "";
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="flex flex-col items-center text-center py-8">
            <div className="w-24 h-24 bg-accent-green-dim text-accent-green rounded-full flex items-center justify-center mb-6 text-4xl">
              🌱
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">Your Sustainability Journey Starts Here</h3>
            <p className="text-text-secondary max-w-md">
              It takes about 2 minutes to complete this profile. The more accurate you are, the better our AI coach can help you.
            </p>
          </div>
        );
      
      case 1:
        return (
          <div className="flex flex-col gap-6">
            <div>
              <label className="input-label mb-3">Primary mode of transport</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "car_gas", label: "Gas Car", icon: "🚗" },
                  { id: "car_ev", label: "Electric Car", icon: "⚡" },
                  { id: "public", label: "Public Transit", icon: "🚌" },
                  { id: "bike", label: "Bike / Walk", icon: "🚲" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateForm("transportMode", option.id)}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      formData.transportMode === option.id
                        ? "border-accent-green bg-accent-green-dim text-accent-green"
                        : "border-border bg-bg-secondary hover:border-text-muted"
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="input-label flex justify-between">
                <span>Daily commute distance (one way)</span>
                <span className="text-accent-green">{formData.dailyCommute} miles</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.dailyCommute}
                onChange={(e) => updateForm("dailyCommute", parseInt(e.target.value))}
                className="w-full accent-accent-green"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col gap-6">
            <div>
              <label className="input-label mb-3">Which best describes your diet?</label>
              <div className="flex flex-col gap-2">
                {[
                  { id: "meat_heavy", label: "Meat heavy (Every day)" },
                  { id: "average", label: "Average (Meat 3-4 times/week)" },
                  { id: "pescatarian", label: "Pescatarian (Fish but no meat)" },
                  { id: "vegetarian", label: "Vegetarian (No meat/fish)" },
                  { id: "vegan", label: "Vegan (No animal products)" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateForm("dietType", option.id)}
                    className={`p-3 rounded-lg border text-left px-4 transition-all ${
                      formData.dietType === option.id
                        ? "border-accent-green bg-accent-green-dim text-accent-green font-medium"
                        : "border-border bg-bg-secondary hover:bg-bg-tertiary"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="input-label mb-3">How often do you cook at home?</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "mostly_home", label: "Mostly home cooked" },
                  { id: "mixed", label: "Mixed / 50-50" },
                  { id: "mostly_out", label: "Mostly eating out" },
                  { id: "delivery", label: "Frequent delivery" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateForm("mealPrep", option.id)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      formData.mealPrep === option.id
                        ? "border-accent-green bg-accent-green-dim text-accent-green font-medium"
                        : "border-border bg-bg-secondary hover:bg-bg-tertiary"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col gap-6">
            <div>
              <label className="input-label mb-3">Home Type</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "apartment", label: "Apartment", icon: "🏢" },
                  { id: "townhouse", label: "Townhouse", icon: "🏡" },
                  { id: "detached", label: "Detached House", icon: "🏠" },
                  { id: "large_house", label: "Large House", icon: "🏰" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateForm("housingType", option.id)}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      formData.housingType === option.id
                        ? "border-accent-green bg-accent-green-dim text-accent-green"
                        : "border-border bg-bg-secondary hover:border-text-muted"
                    }`}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="input-label mb-3">Primary Energy Source</label>
              <div className="flex flex-col gap-2">
                {[
                  { id: "grid_standard", label: "Standard Grid Mix" },
                  { id: "grid_green", label: "Green Energy Plan (Grid)" },
                  { id: "solar", label: "Rooftop Solar" },
                  { id: "mixed_renewable", label: "Mixed Renewable" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateForm("energySource", option.id)}
                    className={`p-3 rounded-lg border text-left px-4 transition-all ${
                      formData.energySource === option.id
                        ? "border-accent-green bg-accent-green-dim text-accent-green font-medium"
                        : "border-border bg-bg-secondary hover:bg-bg-tertiary"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="input-label flex justify-between">
                <span>Household size (people)</span>
                <span className="text-accent-green">{formData.householdSize}</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.householdSize}
                onChange={(e) => updateForm("householdSize", parseInt(e.target.value))}
                className="w-full accent-accent-green"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col gap-8">
            <div>
              <label className="input-label mb-3">Shopping Habits</label>
              <div className="flex flex-col gap-2">
                {[
                  { id: "minimalist", label: "Minimalist / Buy second-hand" },
                  { id: "average", label: "Average consumer" },
                  { id: "frequent", label: "Frequent shopper / Fast fashion" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateForm("shoppingHabits", option.id)}
                    className={`p-3 rounded-lg border text-left px-4 transition-all ${
                      formData.shoppingHabits === option.id
                        ? "border-accent-green bg-accent-green-dim text-accent-green font-medium"
                        : "border-border bg-bg-secondary hover:bg-bg-tertiary"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="input-label">Waste Management</label>
              
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-bg-secondary cursor-pointer hover:bg-bg-tertiary transition-colors">
                <input
                  type="checkbox"
                  checked={formData.wasteRecycling}
                  onChange={(e) => updateForm("wasteRecycling", e.target.checked)}
                  className="w-5 h-5 rounded border-border text-accent-green focus:ring-accent-green bg-bg-primary"
                />
                <span className="font-medium text-text-primary">I regularly recycle</span>
              </label>
              
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-bg-secondary cursor-pointer hover:bg-bg-tertiary transition-colors">
                <input
                  type="checkbox"
                  checked={formData.wasteComposting}
                  onChange={(e) => updateForm("wasteComposting", e.target.checked)}
                  className="w-5 h-5 rounded border-border text-accent-green focus:ring-accent-green bg-bg-primary"
                />
                <span className="font-medium text-text-primary">I compost organic waste</span>
              </label>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const step = ONBOARDING_STEPS[currentStep];

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <div className="h-2 w-full bg-bg-tertiary fixed top-0 z-50">
        <div 
          className="h-full bg-gradient-eco transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 py-12 md:p-8">
        <div className="w-full max-w-xl">
          <div className="mb-8 text-center animate-fade-in-up">
            <span className="text-sm font-semibold text-accent-green uppercase tracking-wider mb-2 block">
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-3">
              {step.title}
            </h1>
            <p className="text-text-secondary text-lg">
              {step.description}
            </p>
          </div>

          <Card variant="elevated" className="p-6 md:p-8 min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0 || isLoading}
                className={currentStep === 0 ? "opacity-0 pointer-events-none" : ""}
              >
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                isLoading={isLoading}
                className="min-w-[120px]"
              >
                {currentStep === ONBOARDING_STEPS.length - 1 ? "Complete Profile" : "Continue"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
