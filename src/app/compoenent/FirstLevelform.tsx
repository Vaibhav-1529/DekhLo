// @ts-nocheck
"use client";

import { useState } from "react";
import { Usercookie } from "../action";

export default function FirstLevelform({ shiftSlides }) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9]{6,9}$/;

    const error = {};

    if (!emailRegex.test(email)) {
      error.email = "Invalid Email";
    }

    if (!usernameRegex.test(username)) {
      error.username = "Username must be 6–9 alphanumeric characters";
    }

    if (!password.trim()) {
      error.password = "Password cannot be empty";
    }

    if (Object.keys(error).length > 0) {
      setMessage(error);
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await Usercookie(formData);
      if (res?.success === "true") {
        shiftSlides("right");
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
      <h3 className="text-xl font-semibold text-white">Login details</h3>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-base text-[#00FFD1]">Username</label>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg p-2 bg-[#2A2A2A] text-white"
          type="text"
          name="username"
          required
        />
        <div className="text-xs text-red-500">{message.username}</div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-base text-[#00FFD1]">Password</label>
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg p-2 bg-[#2A2A2A] text-white"
          type="password"
          name="password"
          required
        />
        <div className="text-xs text-red-500">{message.password}</div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-base text-[#00FFD1]">Email</label>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg p-2 bg-[#2A2A2A] text-white"
          type="email"
          name="email"
          required
        />
        <div className="text-xs text-red-500">{message.email}</div>
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
