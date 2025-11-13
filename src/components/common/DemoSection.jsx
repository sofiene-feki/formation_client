import React from "react";

const demoFeatures = [
  {
    title: "Manual Orders Made Easy",
    desc: "Add orders manually in seconds with a clean, intuitive dashboard. Perfect for phone or in-store sales.",
    icon: "/icons/orders.svg", // replace with your asset
  },
  {
    title: "Connected Everywhere",
    desc: "Sync seamlessly with Facebook Pixel, Google services, and more to track conversions and optimize ads.",
    icon: "/icons/integrations.svg",
  },
  {
    title: "Stunning Checkout",
    desc: "Our checkout page is fast, customizable, and built for conversions — making every sale smoother.",
    icon: "/icons/checkout.svg",
  },
];

export default function DemoCTASection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Product Demo
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See how our platform works — from adding manual orders to powerful
            integrations and a stunning checkout.
          </p>
        </div>

        {/* Demo Video */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-xl">
          <video
            src="/demos/full-demo.mp4" // replace with your main demo video
            controls
            className="w-full h-[480px] object-cover"
          />
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoFeatures.map((f, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center bg-indigo-50 rounded-xl mb-4">
                <img src={f.icon} alt={f.title} className="w-10 h-10" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/demo"
            className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition"
          >
            Book a Live Demo
          </a>
        </div>
      </div>
    </section>
  );
}
