'use client'

import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'

export default function Scene3() {
  const component = useRef<HTMLDivElement>(null!)
  const headlineRef = useRef<HTMLHeadingElement>(null!)

  useLayoutEffect(() => {
    console.log("Scene3 useLayoutEffect triggered.");
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top center",
          end: "center center",
          scrub: true,
          onUpdate: (self) => console.log("Scene3 ScrollTrigger progress:", self.progress),
        },
      });

      tl.fromTo(headlineRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        ">-0.5"
      );

    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={component} className="h-screen w-full relative bg-white text-black">
      <div ref={headlineRef} className="absolute inset-0 z-10 flex items-center justify-center text-center pointer-events-none opacity-0">
        <h2 className="text-5xl font-bold">AIが、本質だけを浮かび上がらせる。</h2>
      </div>
    </div>
  )
}