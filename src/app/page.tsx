"use client";
import React from "react";
import { DealList, Footer, Hero } from "./(content)/hero";

export default function Home() {
  const bottomRef = React.useRef<HTMLElement | null>(null);
  const scrollToFooter = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <main className="overflow-hidden">
      <Hero onButtonClick={scrollToFooter} />
      <DealList />
      <div ref={bottomRef}>
        <Footer />
      </div>
    </main>
  );
}
