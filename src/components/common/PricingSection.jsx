"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects.",
      monthly: 19,
      yearly: 190,
      features: ["1 Project", "5GB Storage", "Basic Support"],
    },
    {
      name: "Pro",
      description: "Great for growing teams and startups.",
      monthly: 49,
      yearly: 490,
      features: ["10 Projects", "50GB Storage", "Priority Support"],
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "For large businesses that need scale.",
      monthly: 99,
      yearly: 990,
      features: ["Unlimited Projects", "500GB Storage", "24/7 Support"],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Flexible Pricing</h2>
        <p className="text-gray-600 mb-8">
          Choose a plan that grows with your business.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span
            className={
              !isYearly ? "font-semibold text-indigo-600" : "text-gray-500"
            }
          >
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-indigo-600"
          />
          <span
            className={
              isYearly ? "font-semibold text-indigo-600" : "text-gray-500"
            }
          >
            Yearly <span className="text-sm text-green-600">(Save 20%)</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative border rounded-2xl shadow-md transition hover:scale-105 ${
                plan.highlighted ? "border-indigo-600 shadow-lg" : ""
              }`}
            >
              {/* Special Badge for Pro */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="space-y-2 mt-4">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <p className="text-gray-600">{plan.description}</p>

                {/* Billed Annually Badge */}
                {isYearly && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    Billed Annually
                  </motion.div>
                )}
              </CardHeader>
              <CardContent>
                {/* Animated Price */}
                <div className="h-14 flex items-center justify-center mb-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-4xl font-extrabold"
                    >
                      ${isYearly ? plan.yearly : plan.monthly}
                      <span className="text-base font-medium text-gray-500 ml-1">
                        /{isYearly ? "year" : "mo"}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Features */}
                <ul className="space-y-3 text-left mb-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : ""
                  }`}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
