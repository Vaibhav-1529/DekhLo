//@ts-nocheck
"use client";
import { useEffect, useRef, useState } from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
const API_URL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDVkMTU1OGE4MDI0Y2EyNWRmNjFkMTg0MmMxN2Q4NCIsIm5iZiI6MTc0MjgxNDQ2NS4wNjQsInN1YiI6IjY3ZTEzZDAxY2U2MDVhMWVkMWM3NTBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Qj6JTm62PiUzN5s5Qt_vSgFT3zhGlh4UGs--mPPBNk",
  },
};

export default function MainCarousel() {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoIntervalRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(API_URL, API_OPTIONS);
        const data = await res.json();

        const filteredSlides = data.results
          .filter((movie) => movie.backdrop_path != "")
          .slice(0,5);

        setSlides(filteredSlides);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      autoRotate();
    }
    return () => clearInterval(autoIntervalRef.current);
  }, [slides]);

  const autoRotate = () => {
    clearInterval(autoIntervalRef.current);
    autoIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
  };

  const goLeft = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    autoRotate();
  };

  const goRight = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
    autoRotate();
  };

  return (
    <div className="relative w-full max-w-7xl h-[500px] overflow-hidden mx-auto rounded-xl shadow-lg">
      <div
        className="flex h-full w-full justify-center transition-transform duration-1000 ease-in-out "
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {slides.map((movie) => (
          <div key={movie.id} className="w-fit flex-shrink-0 h-full relative">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-auto object-contain"
            />
                  <div
        className="w-full h-full absolute top-0 left-0 z-10"
        style={{
          background:
            "linear-gradient(270deg,rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 55%)",
        }}
      ></div>
            <div className="absolute text-white bottom-10 w-fit right-10 flex flex-col items-center justify-start z-50">
              
               <h2 className="px-6 py-3 rounded-xl  text-2xl font-bold">
                {movie.title}
              </h2>
              <div className="px-4 py-2 rounded-xl  text-sm flex flex-col gap-1 text-right">
                <span>Rating: {movie.vote_average.toFixed(1)}/10 ⭐</span>
                <span>Release: {movie.release_date}</span>
              </div>
              <button className="text-2xl w-fit bg-[#ffffff87] text-black rounded-xl font-bold px-3 py-2">
                Watch now
              </button>
            </div>
          </div>
        ))}
      </div>


      <button
        onClick={goLeft}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/40 p-3 rounded-full hover:bg-black/70 z-10 opacity-20 hover:opacity-100"
      >
        <FaAngleDoubleLeft className="text-4xl" />
      </button>
      <button
        onClick={goRight}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/40 p-3 rounded-full hover:bg-black/70 z-10 opacity-20 hover:opacity-100"
      >
        <FaAngleDoubleRight className="text-4xl" />
      </button>
    </div>
  );
}
