"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all"; // Import ScrollTrigger
import { motion, useTransform, useScroll } from "framer-motion";

interface CardProps {
  card: {
    url: string;
    title: string;
    id: number;
  };
}

const cards = [
  {
    url: "1.png",
    title: "Extracting the flavour of nature for Appco",
    id: 1,
  },
  {
    url: "2.jpg",
    title: "Arriving at the station of great literature",
    id: 2,
  },
  {
    url: "3.jpg",
    title: "Finding the simplicity in typeface design",
    id: 3,
  },
  {
    url: "4.jpg",
    title: "Crafting a Bold Identity and Website for ProgresjaTech",
    id: 4,
  },
];

// Main component
export default function Home() {
  return (
    <>
      <Marquee />
      <SectionIntro />
      <SectionWork />
    </>
  );
}

// Marquee Component
const Marquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const animate = () => {
      if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
        marquee.scrollLeft = 0;
      } else {
        marquee.scrollLeft += 2;
      }
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="w-full h-screen flex items-center overflow-hidden">
      <div
        ref={marqueeRef}
        className="whitespace-nowrap overflow-x-hidden w-full"
      >
        {[...Array(2)].map((_, index) => (
          <div key={index} className="inline-flex">
            {["Creative", "Frontend", "Designer"].map((word) => (
              <h1
                key={word}
                className="relative -translate-y-10 text-[450px] font-[degularLight] leading-300 mx-16 scale-50 sm:scale-75 md:scale-90 lg:scale-100 tracking-[-20px]"
              >
                {word}
              </h1>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Intro Section Component with Staggered Text Animation Triggered by Scroll
const SectionIntro = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      const words = text.innerText.split(" "); // Split text into words

      text.innerHTML = words
        .map((word) => `<span class="word">${word}</span>`) // Wrap each word in a span
        .join(" ");

      // ScrollTrigger animation for staggered text
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        text.querySelectorAll(".word"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1, // Stagger effect
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text, // Trigger when text enters the viewport
            start: "top 80%", // Start when top of the text is 80% from the top of the viewport
            end: "top 20%", // End when top of the text is 20% from the top of the viewport
            scrub: true, // Scrub with the scroll
          },
        }
      );
    }
  }, []);

  return (
    <div className="w-full min-h-[70vh]">
      <h1
        ref={textRef}
        className="font-[branch] text-[61.44px] leading-[75.12px] tracking-[-1px] text-center mx-auto max-w-[1300px]"
      >
        I am a digital-first brand identity & web designer and a Webflow, Figma
        developer. I help companies connect with their audience, expand their
        reach, and achieve greater commercial success.
      </h1>
    </div>
  );
};

// Work Section Component
const SectionWork = () => {
  return (
    <div className="w-full min-h-[50vh]">
      <h1 className="text-[307.2px] font-[degularLight] tracking-[-10px] leading-[245.76px]">
        Work
      </h1>
      <HorizontalScrollCarousel />
    </div>
  );
};

// Horizontal Scroll Carousel Component
const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Card Component
const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[650px] w-[812px] overflow-hidden flex flex-col rounded-3xl"
    >
      <ImageContainer url={card.url} />
      <TextContainer title={card.title} />
    </div>
  );
};

// Image Container Component
const ImageContainer: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-[75%] object-cover rounded-t-3xl"
    />
  );
};

// Text Container Component
const TextContainer: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="h-[25%] w-full flex items-center">
      <p className="text-5xl font-[branch] max-w-[90%]">{title}</p>
    </div>
  );
};
