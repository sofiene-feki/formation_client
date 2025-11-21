// components/layouts/SidebarLayout.jsx
import React from "react";
import Sidebar from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";

export default function SidebarLayout({
  sidebarItems = [],
  active,
  onChange,
  children,
  className,
}) {
  return (
    <div
      className={cn(
        "w-full min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6",
        className
      )}
    >
      <Sidebar
        items={sidebarItems}
        active={active}
        onChange={onChange}
        className="mt-16 md:mt-0"
      />

      <main className="w-full">{children}</main>
    </div>
  );
}
