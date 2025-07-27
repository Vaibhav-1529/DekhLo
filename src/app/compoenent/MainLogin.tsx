//@ts-nocheck
"use client";

import FirstLevelform from "./FirstLevelform";
import SecondLevelform from "./SecondLevelform";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const steps = [1,2];

export default function MainLogin() {
  const [counter, setCounter] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      const slides = formRef.current.children;
      Array.from(slides).forEach((slide, index) => {
        (slide as HTMLElement).style.left = `${index * 100}%`;
      });
    }
    if (contentRef.current) {
      const contentSlides = contentRef.current.children;
      Array.from(contentSlides).forEach((slide, index) => {
        (slide as HTMLElement).style.top = `${index * 100}%`;
      });
    }
  }, []);

  function shiftSlides (direction: "left" | "right") {
    const form = formRef.current;
    const content = contentRef.current;
    if (!form || !content) return;

    const total = form.children.length;
    if (direction === "right" && counter < total) {
      setCounter((prev) => prev + 1);
      setSlideIndex((prev) => (prev + 1) % total);
      setContentIndex((prev) => (prev + 1) % total);
    } else if (direction === "left" && counter > 1) {
      setCounter((prev) => prev - 1);
      setSlideIndex((prev) => (prev - 1 + total) % total);
      setContentIndex((prev) => (prev - 1 + total) % total);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#0D0D0D]">
      <div className="flex flex-col items-center gap-10 w-fit h-fit max-w-5xl text-white">
        <div className="w-full flex justify-end items-center">
          <div className="relative w-[65%] flex justify-between items-center">
            <div className="absolute top-1/2 w-full h-1 bg-[#1A1A1A] -translate-y-1/2"></div>
            <div
              className="absolute top-1/2 h-1 bg-[#FF0055] z-10 transition-all duration-300"
              style={{
                width: `${((counter - 1) / (steps.length - 1)) * 100}%`,
              }}
            ></div>
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-14 h-14 rounded-full flex items-center justify-center border-4 text-xl z-20 transition-all duration-300 ${
                  i < counter
                    ? "border-[#FF0055] bg-[#1A1A1A]"
                    : "border-[#333333] bg-[#1A1A1A]"
                }`}
              >
                {i < counter ? <FaCheck /> : <FaTimes />}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-10 w-full justify-center">
          {/* Left content panel */}
          <div className="w-[340px] h-[500px] relative overflow-hidden hidden sm:block">
            <div
              ref={contentRef}
              className="absolute w-full h-full transition-all duration-700"
              style={{ transform: `translateY(-${contentIndex * 100}%)` }}
            >
                <div
                  className="absolute w-full h-full top-0 left-0 p-6 text-[#00FFD1] flex flex-col justify-center items-center gap-4 bg-[#0D0D0D]"
                >
                  <h2 className="text-4xl font-bold">Form</h2>
                </div>
                <div
                  className="absolute w-full h-full top-0 left-0 p-6 text-[#00FFD1] flex flex-col justify-center items-center gap-4 bg-[#0D0D0D]"
                >
                  <h2 className="text-4xl font-bold">Form</h2>
                </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="w-[733px] h-[500px] relative overflow-hidden">
            <div
              ref={formRef}
              className="absolute w-full h-full transition-all duration-700"
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
                <FirstLevelform shiftSlides={shiftSlides}/>
                <SecondLevelform shiftSlides={shiftSlides}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
