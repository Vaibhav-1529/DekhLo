//@ts-nocheck
import { NextResponse } from "next/server";

export default function middleware(req) {
  const user = req.cookies.get("user")?.value;
  const pathname = req.nextUrl.pathname;

  const protectedPaths = ["/search", "/profile"]; // removed "/"

  if (protectedPaths.includes(pathname)) {
    if (!user) {
      return NextResponse.redirect(new URL("https://dekh-4lm6rupsm-vaibhav-1529s-projects.vercel.app/login", req.url));
    }
  }

  return NextResponse.next();
}
