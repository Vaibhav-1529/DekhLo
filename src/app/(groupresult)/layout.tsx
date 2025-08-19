"use client";
import { PageCountProvider } from "../compoenent/PageCountContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageCountProvider>
      {children}
    </PageCountProvider>
  );
}
