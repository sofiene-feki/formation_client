import React from "react";
import Slider from "react-slick";

const features = [
  {
    title: "CRUD Products",
    description: "Easily create, update, and delete your products in seconds.",
  },
  {
    title: "Manage Categories & Packs",
    description:
      "Organize products with categories, sub-categories, and packs.",
  },
  {
    title: "Homepage Control",
    description: "Customize sliders, banners, and featured products anytime.",
  },
  {
    title: "Analytics & Tracking",
    description: "Monitor conversions, sales, and performance in real-time.",
  },
  {
    title: "Order Management",
    description: "Track and process orders effortlessly from one dashboard.",
  },
];

export default function FeaturesSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12">
          Key Features
        </h2>

        <Slider {...settings} className="space-x-4">
          {features.map((feature) => (
            <div key={feature.title} className="p-4">
              <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col justify-between hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
