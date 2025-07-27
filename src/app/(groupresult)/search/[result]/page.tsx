//@ts-nocheck
"use client";
import SearchNav from "@/app/compoenent/Navbar";
import HomeMovieCard from "@/app/compoenent/HomeMovieCard";
import { useSearchParams, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PageCountContext } from "../../layout";

export default function Page() {
  const { currentPage,setCurrentPage } = useContext(PageCountContext);
  const searchParams = useSearchParams();
  const params = useParams();
  const name = params.result;
const paramurl = decodeURIComponent(searchParams.get("url") || "");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDVkMTU1OGE4MDI0Y2EyNWRmNjFkMTg0MmMxN2Q4NCIsIm5iZiI6MTc0MjgxNDQ2NS4wNjQsInN1YiI6IjY3ZTEzZDAxY2U2MDVhMWVkMWM3NTBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Qj6JTm62PiUzN5s5Qt_vSgFT3zhGlh4UGs--mPPBNk'
        },
        next: { revalidate: 3600 },
      };
      const res = await fetch(paramurl, options);
      const tempdata = await res.json();
      setData(tempdata.results);
    }

    if (paramurl) fetchData();
  }, [paramurl, currentPage]);


  return (
    <div className="w-full bg-[#0D0D0D]">
      <SearchNav />
      <div className="p-5 bg-[#121418] rounded-xl shadow-lg max-w-7xl mx-auto w-full flex flex-col justify-center mt-4">
        <h2 className="text-white text-lg font-bold mb-4">"{name}"</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.isArray(data)&&data.map((movie, index) => (
            <HomeMovieCard movie={movie} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
