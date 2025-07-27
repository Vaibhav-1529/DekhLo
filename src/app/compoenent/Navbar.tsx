"use client";

import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  function handleclick() {
    router.push(`/search`);
  }

  return (
    <nav className="w-full bg-gradient-to-r from-black via-gray-900 to-black text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-3xl font-extrabold tracking-tight text-red-500 hover:text-red-400 transition-all ">
          DekhLo 🎬
        </div>
        <div className="w-full sm:w-auto flex-grow flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              onClick={handleclick}
              placeholder="Search for movies..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
          </div>
        </div>
      </div>
    </nav>
  );
}
