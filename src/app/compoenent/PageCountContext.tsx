"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

type PageCountContextType = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentMovie: any;
  setCurrentMovie: (movie: any) => void;
};

export const PageCountContext = createContext<PageCountContextType | null>(null);

export function PageCountProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMovie, setCurrentMovie] = useState({});

  useEffect(() => {
    console.log(currentMovie);
  }, [currentMovie]);

  return (
    <PageCountContext.Provider
      value={{ currentPage, setCurrentPage, currentMovie, setCurrentMovie }}
    >
      {children}
    </PageCountContext.Provider>
  );
}
