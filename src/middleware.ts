//@ts-nocheck

import { NextResponse } from "next/server";

export default function middleware(req){
    const user=req.cookies.get("user")?.value;
    const pathname=req.nextUrl.pathname
    const protectedPaths=["/search","/","/profile"];
    if(protectedPaths.includes(pathname)){
        if(!user){
            return NextResponse.redirect("http://localhost:3000/login");
        }
    }
    return NextResponse.next();
}