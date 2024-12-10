"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
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
      <AboutWrapper />
      <ServiceMarquee />
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

const SectionIntro = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      const words = text.innerText.split(" ");

      text.innerHTML = words
        .map((word) => `<span class="word">${word}</span>`)
        .join(" ");

      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        text.querySelectorAll(".word"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
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
    <div className="w-full min-h-[50vh] ">
      <h1 className="text-[307.2px] font-[degularLight] tracking-[-10px] leading-[245.76px] px-4">
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

// About Wrapper Component
const AboutWrapper = () => {
  return (
    <section className="about-wrapper h-screen flex items-center p-8">
      <div className="about-container flex flex-1 p-8 gap-3">
        <div className="left-profile flex-1 flex items-center justify-center rounded-[12px] overflow-hidden h-screen">
          <Image
            src="/profile.jpg"
            alt="product preview"
            width={1364}
            height={866}
            quality={100}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="right-about flex-1 px-10 py-5 text-gray-800 flex flex-col justify-between bg-white rounded-[12px] h-screen">
          <h1 className="text-9xl font-bold font-[degularRegular] leading-[107.52px]">
            Hello there,
            <br />
            I'm Rakibul
          </h1>
          <div className="font-[degularLight] flex flex-col gap-4 text-2xl leading-[30px] tracking-[-0.2px]">
            <p>
              I design bespoke brand identities and websites that fit each
              company like a well-tailored suit, ensuring your brand stands out
              digitally and physically. Specialising in brand identity design,
              I'm also a web designer and Webflow developer with a keen eye for
              typography and motion design.
            </p>
            <p>
              I honed my skills at Coventry University and have created
              impactful visuals for over four years. Guided by Leonardo da
              Vinci's principle that "Simplicity is the ultimate
              sophistication," I bring clarity and elegance to each project.
            </p>
            <p>
              Outside work, I enjoy photography, travelling, and staying active
              through running, resistance training, and playing volleyball.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Marquee

const ServiceMarquee = () => {
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
    <>
      <div className="w-full py-20 flex items-center overflow-hidden">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap overflow-x-hidden w-full"
        >
          {[...Array(2)].map((_, index) => (
            <div key={index} className="inline-flex">
              {["Service -", "Service -", "Service -"].map((word) => (
                <h1
                  key={word}
                  className="relative -translate-y-10 text-[250px] font-[degularLight] leading-300 mx-16 scale-50 sm:scale-75 md:scale-90 lg:scale-100 tracking-[-5px]"
                >
                  {word}
                </h1>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="card-wrapper min-h-screen flex items-center p-8">
        <div className="card-container flex flex-col w-full gap-8">
          {/* Top Cards */}
          <div className="top-card flex w-full gap-4 justify-between">
            <div className="card-1 flex-1 h-[437px] rounded-lg shadow-md relative overflow-hidden">
              <Image
                src="/artboard.jpg"
                alt="product preview"
                width={1364}
                height={866}
                quality={100}
                className="object-cover w-full h-full opacity-20"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between items-center p-4 bg-opacity-50">
                <h1 className="font-[degularLight] text-[92.16px] font-bold leading-[82.16px] tra">
                  Digital First Branding
                </h1>
                <p className="text-[24.576px] tracking-[0.2px] font-[degularLight] leading-[29.497px]">
                  I specialise in creating digital-first branding that captures
                  your brand's essence and connects with your audience across
                  all digital platforms. From logos to social media graphics, I
                  design cohesive brand identities that resonate in the online
                  world, ensuring your brand remains consistent, memorable, and
                  impactful in the digital age.
                </p>
              </div>
            </div>
            <div className="card-2 flex-1 h-[437px] rounded-lg shadow-md relative overflow-hidden">
              <Image
                src="/artboard.jpg"
                alt="product preview"
                width={1364}
                height={866}
                quality={100}
                className="object-cover w-full h-full opacity-20"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between items-center p-4 bg-opacity-50">
                <h1 className="font-[degularLight] text-[92.16px] font-bold leading-[82.16px] tracking-[-2px]">
                  Web Design & Development
                </h1>
                <p className="text-[24.576px] tracking-[0.2px] font-[degularLight] leading-[29.497px]">
                  I specialise in creating digital-first branding that captures
                  your brand's essence and connects with your audience across
                  all digital platforms. From logos to social media graphics, I
                  design cohesive brand identities that resonate in the online
                  world, ensuring your brand remains consistent, memorable, and
                  impactful in the digital age.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="bottom-card w-full">
            <div className="card-3 flex-1 h-[437px] rounded-lg shadow-md relative overflow-hidden">
              <Image
                src="/artboard.jpg"
                alt="product preview"
                width={1364}
                height={866}
                quality={100}
                className="object-cover w-full h-full opacity-20"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between items-center p-4 bg-opacity-50 w-1/2">
                <h1 className="font-[degularLight] text-[92.16px] font-bold leading-[82.16px] tracking-[-2px]">
                  Bespoke Design Experiences
                </h1>
                <p className="text-[24.576px] tracking-[0.2px] font-[degularLight] leading-[29.497px]">
                  I specialise in creating digital-first branding that captures
                  your brand's essence and connects with your audience across
                  all digital platforms. From logos to social media graphics, I
                  design cohesive brand identities that resonate in the online
                  world, ensuring your brand remains consistent, memorable, and
                  impactful in the digital age.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
