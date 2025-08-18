// @ts-nocheck
"use client";

import { useState } from "react";
import { APIcookie } from "../action";
import { useRouter } from "next/navigation";

export default function SecondLevelform({ shiftSlides }) {
  const router=useRouter()
  const [api, setApi] = useState("eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDVkMTU1OGE4MDI0Y2EyNWRmNjFkMTg0MmMxN2Q4NCIsIm5iZiI6MTc0MjgxNDQ2NS4wNjQsInN1YiI6IjY3ZTEzZDAxY2U2MDVhMWVkMWM3NTBlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Qj6JTm62PiUzN5s5Qt_vSgFT3zhGlh4UGs--mPPBNk");
  const [message, setMessage] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    const error = {};

    if (!api.trim()) {
      error.api = "API Key cannot be empty";
    }

    if (Object.keys(error).length > 0) {
      setMessage(error);
      return;
    }

    const formData = new FormData();
    formData.append("API_KEY", api);

    try {
      const res = await APIcookie(formData);
      if (res?.success) {
        router.push("/")
        setMessage({server:"ho gya kaam"})
      } else {
        setMessage({ server: res.message });
      }
    } catch (err) {
      setMessage({ server: "Something went wrong!" });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-0 left-0 bg-[#1A1A1A] rounded-2xl p-8 w-full h-full flex flex-col justify-around"
    >
      <h3 className="text-xl font-semibold text-white">API details</h3>
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-base text-[#00FFD1]">API Key</label>
        <input
          placeholder="API Key"
          value={api}
          onChange={(e) => setApi(e.target.value)}
          className="rounded-lg p-2 bg-[#2A2A2A] text-white"
          type="password"
          name="api"
          required
        />
        <div className="text-xs text-red-500">{message.api}</div>
      </div>

      {message.server && (
        <div className="text-sm text-red-400 mt-2">{message.server}</div>
      )}

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-[#FF0055] px-5 py-2 rounded-lg hover:bg-[#cc0044] transition"
        >
          Next
        </button>
      </div>
    </form>
  );
}
