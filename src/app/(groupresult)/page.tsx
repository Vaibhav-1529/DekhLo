//@ts-nocheck
"use client";

import { useContext, useEffect, useState, Suspense } from "react";
import Navbar from "../compoenent/Navbar";
import Sidebar from "../compoenent/Sidebar";
import { useSearchParams } from "next/navigation";
import HomeMovieCard from "../compoenent/HomeMovieCard";
import Generblock from "../compoenent/Generblock";
import MainCarousel from "../compoenent/MainCarousel";
import SearchRamdom from "../compoenent/SearchRamdom";
import { PageCountContext } from "../compoenent/PageCountContext";
import { useRouter } from "next/navigation";

function HomeContent() {
  const { currentPage } = useContext(PageCountContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userInput = searchParams.get("query") || "";

  const [movies, setMovies] = useState([]);

  const url = `https://api.themoviedb.org/3/search/movie?query=${userInput}&include_adult=false&language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer <YOUR_TOKEN_HERE>",
    },
    next: { revalidate: 3600 },
  };

  useEffect(() => {
    async function fetchdata() {
      const result = await fetch(url, options);
      const tempdata = await result.json();
      setMovies(tempdata.results || []);
    }

    if (userInput.trim()) fetchdata();
  }, [userInput]);

  const suggestion = [
    {
      name: "Trending",
      url: `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${currentPage}`,
      bgColor: "bg-red-500",
      textColor: "text-white",
      hover:
        "hover:bg-transparent hover:text-red-500 hover:border-red-500  hover:border-4 ",
    },
    {
      name: "Popular",
      url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`,
      bgColor: "bg-blue-500",
      textColor: "text-yellow-200",
      hover:
        "hover:bg-transparent hover:text-blue-500 hover:border-blue-500  hover:border-4 ",
    },
    {
      name: "Top-rated",
      url: `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`,
      bgColor: "bg-green-500",
      textColor: "text-black",
      hover:
        "hover:bg-transparent hover:text-green-500 hover:border-green-500  hover:border-4 ",
    },
    {
      name: "Upcoming",
      url: `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${currentPage}`,
      bgColor: "bg-purple-500",
      textColor: "text-white",
      hover:
        "hover:bg-transparent hover:text-purple-500 hover:border-purple-500  hover:border-4 ",
    },
  ];

  function handlecard({ url, name }) {
    const encodedUrl = encodeURIComponent(url);
    router.push(`/search/${name}?url=${encodedUrl}`);
  }

  return (
    <div className="flex flex-col items-center bg-[#0D0D0D]">
      <div className="flex justify-center w-full">
        <Navbar />
      </div>

      <div className="max-w-7xl flex flex-col bg-center">
        <div className="w-full h-full">
          <MainCarousel />
        </div>

        <div className="p-4 bg-[#121418] rounded-xl shadow-lg max-w-7xl mx-auto w-full flex flex-col justify-center mt-4">
          <div className="flex overflow-x-auto gap-4 no-scrollbar overflow-y-hidden py-4 items-center">
            {suggestion.map((item, index) => (
              <div
                onClick={() => {
                  handlecard({ url: item.url, name: item.name });
                }}
                key={index}
                className={`${item.bgColor} ${item.textColor} flex-shrink-0 p-4 shadow-lg flex items-center ${item.hover}`}
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0, 100% 58%, 77% 100%, 0 100%)",
                  width: "300px",
                  height: "130px",
                }}
              >
                <h2 className="text-5xl font-bold">{item.name}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="p--2 rounded-xl shadow-lg max-w-7xl mx-auto w-full flex flex-col justify-center mt-4">
          <SearchRamdom />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<p className="text-white">Loading...</p>}>
      <HomeContent />
    </Suspense>
  );
}
