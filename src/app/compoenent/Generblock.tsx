// @ts-nocheck
"use client";
import { useEffect, useState } from "react";

export default function Generblock({ setInputGenre, InputGenre }) {
  const [genres, setGenres] = useState([]);
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDVkMTU1OGE4MDI0Y2EyNWRmNjFkMTg0MmMxN2Q4NCIsIm5iZiI6MTc0MjgxNDQ2NS4wNjQsInN1YiI6IjY3ZTEzZDAxY2U2MDVhMWVkMWM3NTBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Qj6JTm62PiUzN5s5Qt_vSgFT3zhGlh4UGs--mPPBNk",
    },
  };

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(url, options);
      const tempdata = await result.json();
      setGenres(tempdata.genres || []);
    }
    fetchData();
  }, []);

  function handletoggle(id) {
    setInputGenre((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  return (
    <div className="p-6 bg-[#121418] rounded-2xl shadow-lg max-w-7xl mx-auto w-full flex flex-col justify-center mt-6">
      <h2 className="text-white text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
        🎬 Select Genres
      </h2>
      <div className="flex flex-wrap gap-3">
        {genres.map((item) => (
          <div
            key={item.id}
            onClick={() => handletoggle(item.id)}
            className={`px-4 py-2 rounded-xl font-medium text-sm cursor-pointer transition-all duration-200 border
              ${
                InputGenre.includes(item.id)
                  ? "bg-[#00FFD1] text-black border-transparent hover:bg-[#14e1b4]"
                  : "bg-[#181d23] text-white border-[#3a3a3a] hover:bg-[#393939]"
              }`}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
