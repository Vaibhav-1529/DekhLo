"use client";

import { Suspense } from "react";
import SearchPageContent from "@/app/compoenent/SearchPageContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
