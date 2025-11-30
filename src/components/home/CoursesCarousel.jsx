import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./CourseCard";
import CategoryTabs from "./CategoryTabs";
import { courseApi } from "@/features/courses/api";

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-50"
    >
      <ChevronRight size={22} />
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-50"
    >
      <ChevronLeft size={22} />
    </button>
  );
}

export default function CoursesCarousel() {
  const categories = [
    "Artificial Intelligence (AI)",
    "Python",
    "Microsoft Excel",
    "AI Agents & Agentic AI",
    "Digital Marketing",
    "Amazon AWS",
  ];

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await courseApi.getAll();
        setCourses(data?.courses || []);
      } catch (err) {
        console.error("Erreur lors du chargement des cours :", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // ⚡ Slider Settings (Udemy-like)
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 450,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">
        Skills to transform your career and life
      </h2>

      <p className="text-gray-500 text-sm mb-6">
        From critical skills to technical topics, our courses support your
        professional development.
      </p>

      {/* Tabs */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Carousel */}
      <div className="relative mt-6">
        <Slider {...sliderSettings}>
          {courses?.map((course) => (
            <div key={course._id} className="px-2">
              <CourseCard course={course} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="text-right mt-4">
        <button className="text-indigo-600 text-sm font-medium hover:underline">
          Show all {activeCategory} courses →
        </button>
      </div>
    </section>
  );
}
