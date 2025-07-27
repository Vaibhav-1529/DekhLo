//@ts-nocheck
"use client"
import { useRouter } from "next/navigation";
import { PageCountContext } from "../(groupresult)/layout";
import { useContext } from "react";

export default function HomeMovieCard({ movie }) {
  const router = useRouter()
  const { setCurrentMovie } = useContext(PageCountContext);
  function handleopen(){
      setCurrentMovie(movie)
      router.push(`/movie`)
  }
  console.log(movie)
  return (
    <div
      onClick={() => setCurrentMovie(movie)}
      className="
        relative min-w-[180px] sm:min-w-[200px] 
        h-[320px] sm:h-[350px] rounded-lg overflow-hidden 
        group transition-transform duration-300 ease-in-out
        transform hover:scale-105 hover:shadow-[0_0_15px_#00FFD1] 
        bg-[#181d23] shadow-md cursor-pointer
      "
    >
      <img
        className="w-full h-[70%] object-cover rounded-t-lg transition-all duration-300 group-hover:brightness-75"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg"
        }
        alt={movie.title}
      />

      <div
      onClick={handleopen}
       className="px-3 pb-8 flex flex-col gap-1 text-white">
        <h3 className="text-sm sm:text-base font-semibold text-white truncate">
          {movie.title}
        </h3>

        <p className="text-xs text-[#00FFD1]">{movie.release_date}</p>
        <p className="text-xs text-yellow-400">⭐ {movie.vote_average}/10</p>
        <p className="text-xs text-gray-400 line-clamp-2">
          {movie.overview}
        </p>
      </div>

      <div className="absolute inset-0 border border-transparent group-hover:border-[#7ec2b5] rounded-lg pointer-events-none transition-all duration-300"></div>
    </div>
  );
}
