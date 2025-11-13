import React from "react";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import CoursesCarousel from "@/components/home/CoursesCarousel";
import BenefitsSection from "@/components/home/BenefitsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FooterSection from "@/components/home/FooterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <CoursesCarousel />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
