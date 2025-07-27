//@ts-nocheck
"use client";
import { useState, useEffect, useMemo } from "react";
import Generblock from "../../compoenent/Generblock";
import MainCarousel from "../../compoenent/MainCarousel";
import SearchNav from "../../compoenent/SearchNav";
import { useSearchParams } from "next/navigation";
import SearchRamdom from "../../compoenent/SearchRamdom";
import HomeMovieCard from "../../compoenent/HomeMovieCard";
import { text } from "stream/consumers";

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [InputGenre, setInputGenre] = useState([]);
  const searchParams = useSearchParams();
  const userInput = searchParams.get("query") || "";

  const url = `https://api.themoviedb.org/3/search/movie?query=${userInput}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDVkMTU1OGE4MDI0Y2EyNWRmNjFkMTg0MmMxN2Q4NCIsIm5iZiI6MTc0MjgxNDQ2NS4wNjQsInN1YiI6IjY3ZTEzZDAxY2U2MDVhMWVkMWM3NTBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Qj6JTm62PiUzN5s5Qt_vSgFT3zhGlh4UGs--mPPBNk",
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
  const filterdata = useMemo(() => {
    if (!InputGenre.length) return movies; // If no genre is selected, return all movies

    return movies.filter((movie) =>
      movie.genre_ids.some((id) => InputGenre.includes(id))
    );
  }, [InputGenre, movies]);
  return (
    <div className="w-full bg-[#0D0D0D]">
      <SearchNav />
      <div>
        <Generblock setInputGenre={setInputGenre} InputGenre={InputGenre} />
      </div>


      {userInput.trim() ? (
        <div className="p-2 bg-[#121418] rounded-xl shadow-lg max-w-7xl mx-auto w-full flex flex-col justify-center mt-4">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Search Results for <span className="text-[#00FFD1]">"{userInput}"</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filterdata.map((movie, index) => (
              <HomeMovieCard movie={movie} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <SearchRamdom />
      )}
    </div>
  );
}
