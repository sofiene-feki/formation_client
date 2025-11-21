// components/ui/Sidebar.jsx
import React from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export default function Sidebar({ items = [], active, onChange, className }) {
  const [open, setOpen] = React.useState(false);

  return (
    <aside className={cn("relative h-full", className)}>
      {/* Mobile toggle */}
      <button
        className="md:hidden absolute -top-12 left-0 flex items-center gap-2 text-gray-700"
        onClick={() => setOpen(!open)}
      >
        <Menu className="h-5 w-5" />
        Menu
      </button>

      <div
        className={cn(
          "bg-white/60 backdrop-blur-md border border-gray-200/40 shadow-lg rounded-xl p-4 flex flex-col gap-2 w-64 transition-all duration-300",
          "md:static absolute z-50",
          open ? "left-0" : "-left-80"
        )}
      >
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={cn(
              "text-left px-4 py-2 rounded-lg font-medium transition-all",
              "hover:bg-gray-200/50 hover:text-gray-900",
              active === item.key
                ? "bg-gray-900 text-white shadow-md"
                : "text-gray-700"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
