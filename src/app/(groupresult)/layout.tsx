//@ts-nocheck
"use client";
import { useState, createContext, useEffect } from "react";
export const PageCountContext = createContext();
export default function RootLayout({ children }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMovie, setCurrentMovie] = useState({});
  useEffect(()=>{
    console.log(currentMovie)
  },[currentMovie])
  return (
    <div>
        <PageCountContext.Provider
          value={{ currentPage: currentPage, setCurrentPage: setCurrentPage, currentMovie: currentMovie,setCurrentMovie:setCurrentMovie }}
        >
          {children}
        </PageCountContext.Provider>
      </div>
  );
}
