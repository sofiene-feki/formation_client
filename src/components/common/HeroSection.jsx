"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import test from "../../assets/test.mp4"; // your video file

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        src={test}
      />

      {/* Black Transparent Overlay */}
      <div className="absolute w-full h-full bg-black/60"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center lg:justify-between gap-12 text-center lg:text-left">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Launch Your Online Shop <br className="hidden sm:block" /> in 48
            Hours
          </h1>
          <p className="text-white text-lg sm:text-xl">
            Manage products, packs, orders, and analytics—all in one dashboard.
            Start selling online immediately, without hassle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-6">
            <Link to="/demo">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3">
                Request Demo
              </Button>
            </Link>
            <Link to="/features">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black px-6 py-3"
              >
                See Features
              </Button>
            </Link>
          </div>

          {/* Optional trust logos / clients */}
        </div>

        {/* Optional Right Mockup */}
        {/* You can remove this if you want full video background */}
        {/* <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg">
            <img
              src={heroMockup}
              alt="Product Mockup"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}
