//@ts-nocheck
"use client";
import HomeMovieCard from "./HomeMovieCard";
import Link from "next/link";
import { RxDoubleArrowRight } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import { PageCountContext } from "../(groupresult)/layout";
export default function GenerContext({ id, name }) {
    const { currentPage } = useContext(PageCountContext);
  const [rowdata, setRowdata] = useState([]);

  const parurl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc&with_genres=${id}`;
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`;
  const options = {
        method: "GET",
        headers: {
          accept: "application/json",
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDVkMTU1OGE4MDI0Y2EyNWRmNjFkMTg0MmMxN2Q4NCIsIm5iZiI6MTc0MjgxNDQ2NS4wNjQsInN1YiI6IjY3ZTEzZDAxY2U2MDVhMWVkMWM3NTBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Qj6JTm62PiUzN5s5Qt_vSgFT3zhGlh4UGs--mPPBNk'
        },
        next: { revalidate: 3600 },

  };

useEffect(() => {
  async function fetchData() {
    const result = await fetch(parurl, options); // uses correct page
    const tempdata = await result.json();
    setRowdata(tempdata.results);
  }
  fetchData();
}, [id, currentPage])

  const encodedUrl = encodeURIComponent(parurl);
  return (
    <div className="p-5 bg-[#121418] rounded-xl shadow-lg max-w-7xl mx-auto w-full flex flex-col justify-center mt-4">
      <div className="flex gap-9">
        <h2 className="text-white text-2xl font-bold mb-4">{name}</h2>
        <Link href={`/search/${name}?url=${encodedUrl}`}>
          <RxDoubleArrowRight className="text-white size-8 hover:text-[#70ccbb]" />
        </Link>
      </div>
      {
        rowdata?<div className="flex overflow-x-auto gap-4  no-scrollbar overflow-y-hidden py-4 px-3">
        {Array.isArray(rowdata)&&rowdata.map((item, index) => (
          <HomeMovieCard movie={item} key={index} />
        ))}
      </div>:
      <div className="text-xl text-gray-500">No Movies is available...</div>

      }
      
    </div>
  );
}