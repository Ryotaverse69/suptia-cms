'use client'

import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'

export default function Scene2() {
  const component = useRef<HTMLDivElement>(null!)
  const headlineRef = useRef<HTMLHeadingElement>(null!)

  useLayoutEffect(() => {
    console.log("Scene2 useLayoutEffect triggered.");
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top top",
          end: "+=400%", // Animate over 400% of the viewport height
          scrub: true,
          pin: true,
          onUpdate: (self) => console.log("Scene2 ScrollTrigger progress:", self.progress),
        },
      });

      // Animate headline appearance
      tl.fromTo(headlineRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        ">-0.2"
      );

      // Animate headline disappearance
      tl.to(headlineRef.current, { opacity: 0, duration: 0.5 }, "<");

    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={component} className="h-screen w-full relative">
      <div className="h-full w-full flex items-center justify-center text-center">
        <h2 ref={headlineRef} className="text-5xl font-bold max-w-4xl mx-auto">そのサプリ、本当にあなたのためですか。</h2>
      </div>
    </div>
  )
}