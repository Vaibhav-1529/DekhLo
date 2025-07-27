//@ts-nocheck
"use client";
import Image from "next/image";

export default function Movie({ movie }) {
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backdropUrl})`,
      }}
    >
      {/* Black Transparent Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Movie Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen p-4 text-white max-w-6xl mx-auto">
        <div className="w-[300px] h-auto mb-6 md:mb-0 md:mr-8">
          <Image
            src={posterUrl}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-xl shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-4 max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
          <p className="text-gray-300">{movie.release_date}</p>
          <p className="text-lg">{movie.overview}</p>
          <div className="flex gap-4">
            <span className="px-4 py-2 bg-red-600 rounded-lg">
              Rating: {movie.vote_average}
            </span>
            <span className="px-4 py-2 bg-blue-600 rounded-lg">
              Votes: {movie.vote_count}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
