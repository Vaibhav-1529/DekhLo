"use client";

import { useContext } from "react";
import { PageCountContext } from "@/app/compoenent/PageCountContext";

export default function MoviePage() {
  const context = useContext(PageCountContext);

  if (!context) return <p>Loading...</p>; // context not ready

  const { currentMovie } = context;

  if (!currentMovie || !currentMovie.title) {
    return <p>No movie selected</p>;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`;

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen p-4 text-white max-w-6xl mx-auto">
        <div className="w-[300px] h-auto mb-6 md:mb-0 md:mr-8">
          <img
            src={posterUrl}
            alt={currentMovie.title}
            width={300}
            height={450}
            className="rounded-xl shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-4 max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold">
            {currentMovie.title}
          </h1>
          <p className="text-gray-300">{currentMovie.release_date}</p>
          <p className="text-lg">{currentMovie.overview}</p>
          <div className="flex gap-4">
            <span className="px-4 py-2 bg-red-600 rounded-lg">
              Rating: {currentMovie.vote_average}
            </span>
            <span className="px-4 py-2 bg-blue-600 rounded-lg">
              Votes: {currentMovie.vote_count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
