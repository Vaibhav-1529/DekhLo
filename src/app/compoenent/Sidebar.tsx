"use client";

import { useState } from "react";

const categories = [
  { name: "Trending", icon:""},
  { name: "Top Rated", icon:"" },
  { name: "Action", icon:""  },
  { name: "Comedy", icon:"" },
  { name: "Drama", icon:"" },
  { name: "Horror", icon:""},
  { name: "Sci-Fi", icon:"" },
  { name: "TV Shows", icon:""  },
];

export default function Sidebar() {
  const [active, setActive] = useState("Trending");

  return (
    <aside className="w-64 min-h-screen bg-[#0f172a] text-white shadow-lg p-5">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-xl font-bold">Categories</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActive(cat.name)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${active === cat.name
                ? "bg-blue-600 scale-[1.02]"
                : "hover:bg-blue-700"
              }`}
          >
            {cat.icon}
            <span className="text-sm font-medium">{cat.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
