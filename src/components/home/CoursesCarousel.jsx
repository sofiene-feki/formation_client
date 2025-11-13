import React, { useState } from "react";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import CategoryTabs from "./CategoryTabs";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CoursesCarousel() {
  const categories = [
    "Artificial Intelligence (AI)",
    "Python",
    "Microsoft Excel",
    "AI Agents & Agentic AI",
    "Digital Marketing",
    "Amazon AWS",
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [scrollIndex, setScrollIndex] = useState(0);

  const courses = [
    {
      title: "The AI Engineer Course 2025: Complete AI Engineer Bootcamp",
      instructor: "365 Careers",
      rating: 4.6,
      reviews: "10,906",
      price: 9.99,
      oldPrice: 59.99,
      tag: "Bestseller",
      image: "https://img-c.udemycdn.com/course/240x135/5678282_07d1_2.jpg",
    },
    {
      title: "Intro to AI Agents and Agentic AI",
      instructor: "365 Careers",
      rating: 4.4,
      reviews: "976",
      price: 9.99,
      oldPrice: 34.99,
      tag: "Bestseller",
      image: "https://img-c.udemycdn.com/course/240x135/6002580_6a7c_3.jpg",
    },
    {
      title: "Artificial Intelligence for Business + ChatGPT Prize [2025]",
      instructor: "Hadelin de Ponteves",
      rating: 4.4,
      reviews: "4,835",
      price: 11.99,
      oldPrice: 74.99,
      tag: "Premium",
      image: "https://img-c.udemycdn.com/course/240x135/5124412_7e05_4.jpg",
    },
    {
      title: "The Complete Guide To AI Powered Salesforce Development",
      instructor: "Matt Gerry",
      rating: 4.8,
      reviews: "77",
      price: 9.99,
      oldPrice: 34.99,
      tag: "Hot & New",
      image: "https://img-c.udemycdn.com/course/240x135/5752142_8a26_2.jpg",
    },
  ];

  const scrollLeft = () => setScrollIndex((prev) => Math.max(prev - 1, 0));
  const scrollRight = () =>
    setScrollIndex((prev) => Math.min(prev + 1, courses.length - 4));

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">
        Skills to transform your career and life
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        From critical skills to technical topics, our courses support your
        professional development.
      </p>

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={scrollLeft}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-50"
        >
          <ChevronLeft size={20} />
        </button>

        <motion.div
          className="flex gap-4 overflow-hidden"
          animate={{ x: `-${scrollIndex * 270}px` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {courses.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </motion.div>

        <button
          onClick={scrollRight}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="text-right mt-4">
        <button className="text-indigo-600 text-sm font-medium hover:underline">
          Show all {activeCategory} courses →
        </button>
      </div>
    </section>
  );
}
