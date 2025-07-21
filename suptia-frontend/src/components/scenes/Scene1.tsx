'use client'

import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Scene1() {
  const component = useRef<HTMLDivElement>(null!)
  const textRef = useRef<HTMLDivElement>(null!)

  useLayoutEffect(() => {
    console.log("Scene1 useLayoutEffect triggered.");
    let ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: component.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => console.log("Scene1 ScrollTrigger progress:", self.progress),
        },
        y: "-30%",
        scale: 0.8,
        opacity: 0,
        ease: "none",
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={component} className="h-screen w-full">
      <div ref={textRef} className="h-full flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold">その選択に、確信を。</h1>
        <p className="text-xl mt-4">サプリメントの未来。あなたのものに。</p>
      </div>
    </div>
  )
}
