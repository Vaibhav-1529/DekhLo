// @ts-nocheck
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import wait from "wait";

const data = [
  { name: "vaibhav", password: "vaibhav@123" },
  { name: "vibhu", password: "vaibhav@1529" },
];

export async function Usercookie(Userdata) {
  const name = Userdata.get("username");
  const password = Userdata.get("password");
  console.log(name, password);
  const userFound = data.find(
    (item) => item.name === name && item.password === password
  );

  if (userFound) {
    const usercookies = cookies();
    usercookies.set("user", name);
    return {
      success: "true",
      message: "You are successfully logged in",
    };
  } else {
    return {
      success: "false",
      message: "Enter correct credentials",
    };
  }
}


export async function APIcookie(formData) {
  const apiKey = formData.get("API_KEY");
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    next: { revalidate: 3600 },
  };

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const cookieStore = await cookies(); 
      cookieStore.set("api", apiKey);      
      return {
        success: "true",
        message: "API key valid",
      };
    } else {
      return {
        success: "false",
        message: "Invalid API key",
      };
    }
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: "false",
      message: "Error connecting to API",
    };
  }
}
export async function delecookie() {
    const cookieStore = cookies();
  cookieStore.delete("user");
  cookieStore.delete("api")
  redirect("/login")
}
