//@ts-nocheck
"use client";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { cookies } from "next/headers";
import Mainnav from "@/app/compoenent/MainLogin";
import MainLogin from "@/app/compoenent/MainLogin";
export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(()=>{
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const isEmail = /^[\w.-]+@explorin\.io$/.test(email);
    const isPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
    const isName = name.length >= 5 && name.length <= 10;
    const isDob = dob && new Date(dob) < new Date("2000-01-01");
    if(false){
      setMessage("Validation failed. Check your inputs.");
      return;
    }

    try {
      setPending(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("password", password);
      await handleclick(formData);
    } catch (response) {
      setMessage(response.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-500 flex items-center text-black bg-[rgba(0,0,0,0.7)] justify-center bg-opacity-50">
      <div className=" flex justify-center w-full">
      </div>
      <div className=" w-full h-full">
        <MainLogin/>
      </div>
    </div>
  );
}