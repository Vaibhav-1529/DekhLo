"use client";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { delecookie } from "../action";
import Link from "next/link";

export default function SearchNav() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cookieString = document.cookie;
    const loggedIn = cookieString.split(";").some((cookie) =>
      cookie.trim().startsWith("user=")
    );
    setIsLoggedIn(loggedIn);
  }, []);

  function handleEnter() {
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  }

  return (
    <nav className="w-full bg-[#0D0D0D] text-white border-b border-[#1A1A1A] px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-3xl font-extrabold tracking-tight text-[#00FFD1] hover:text-[#80ddcc] transition-all duration-300">
          DekhLo 🎬
        </div>

        <div className="w-full sm:w-auto flex-grow flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEnter();
                }
              }}
              placeholder="Search for movies..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
          </div>
        </div>

        <div className="m-auto h-full flex justify-center items-center">
          {isLoggedIn ? (
            <div
            onClick={()=>{
              delecookie();
            }}
              className="px-4 py-1 text-xl bg-transparent border-[#00FFD1] border-2 rounded-2xl text-[#00FFD1] hover:bg-[#00FFD1] hover:text-black"
            >
              Log out
            </div>
          ) : (
            <Link
              href="/mainlogin"
              className="px-4 py-1 text-xl bg-transparent border-[#00FFD1] border-2 rounded-2xl text-[#00FFD1] hover:bg-[#00FFD1] hover:text-black"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
