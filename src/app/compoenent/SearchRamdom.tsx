//@ts-nocheck
'use client'
import { useEffect, useState } from "react";
import GenerContext from "./GenerContext";

export default function SearchRamdom() {
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
    
  return (
    <div>
        {genres.map((item,index)=>{
            return(
                <div key={index}>
                <GenerContext id={item.id} name={item.name} key={index}/>
                </div>
            )
        })
        
        }
    </div>
  )
}
