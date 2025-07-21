'use client'

import { useEffect } from 'react'
import "./globals.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, [])

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}