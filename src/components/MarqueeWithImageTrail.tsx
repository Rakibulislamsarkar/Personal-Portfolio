'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MarqueeWithImageTrailProps {
  images: string[];
}

const MarqueeWithImageTrail: React.FC<MarqueeWithImageTrailProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const cacheMousePos = useRef({ x: 0, y: 0 });
  const lastFrame = useRef(0);
  const zIndexVal = useRef(1);
  const imgPosition = useRef(0);
  const imagesRefs = useRef<HTMLImageElement[]>([]);

  const getMouseDistance = () => {
    return Math.hypot(
      mousePos.current.x - lastMousePos.current.x,
      mousePos.current.y - lastMousePos.current.y
    );
  };

  const renderImageTrail = () => {
    const distance = getMouseDistance();
    
    cacheMousePos.current.x = gsap.utils.interpolate(
      cacheMousePos.current.x || mousePos.current.x,
      mousePos.current.x,
      0.1
    );
    cacheMousePos.current.y = gsap.utils.interpolate(
      cacheMousePos.current.y || mousePos.current.y,
      mousePos.current.y,
      0.1
    );

    if (distance > 100) {
      ++zIndexVal.current;
      
      const img = imagesRefs.current[imgPosition.current];
      if (img) {
        gsap.killTweensOf(img);
        gsap.timeline()
          .set(img, {
            startAt: { opacity: 0, scale: 1 },
            opacity: 1,
            scale: 1,
            zIndex: zIndexVal.current,
            x: cacheMousePos.current.x - img.offsetWidth / 2,
            y: cacheMousePos.current.y - img.offsetHeight / 2,
          })
          .to(img, {
            duration: 0.9,
            ease: 'expo.out',
            x: mousePos.current.x - img.offsetWidth / 2,
            y: mousePos.current.y - img.offsetHeight / 2,
          })
          .to(img, {
            duration: 1,
            ease: 'power1.out',
            opacity: 0,
          }, 0.4)
          .to(img, {
            duration: 1,
            ease: 'quint.out',
            scale: 0.2,
          }, 0.4);
      }

      lastMousePos.current = { ...mousePos.current };
      imgPosition.current = imgPosition.current < images.length - 1 ? imgPosition.current + 1 : 0;
    }

    lastFrame.current = requestAnimationFrame(renderImageTrail);
  };

  useEffect(() => {
    const container = containerRef.current;
    const marquee = marqueeRef.current;
    if (!container || !marquee) return;

    const animateMarquee = () => {
      if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
        marquee.scrollLeft = 0;
      } else {
        marquee.scrollLeft += 2;
      }
      requestAnimationFrame(animateMarquee);
    };

    const handleMouseMove = (ev: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current = { 
        x: ev.clientX - rect.left, 
        y: ev.clientY - rect.top 
      };
    };

    const marqueeAnimation = requestAnimationFrame(animateMarquee);
    lastFrame.current = requestAnimationFrame(renderImageTrail);
    
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(marqueeAnimation);
      cancelAnimationFrame(lastFrame.current);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [images]);

  return (
    <div ref={containerRef} className="w-full h-screen flex items-center overflow-hidden relative">
      <div
        ref={marqueeRef}
        className="whitespace-nowrap overflow-x-hidden w-full"
      >
        {[...Array(2)].map((_, index) => (
          <div key={index} className="inline-flex">
            {["Creative", "Frontend", "Designer"].map((word) => (
              <h1
                key={word}
                className="relative -translate-y-10 text-[15rem] lg:text-[250px] font-[degularLight] leading-300 mx-16 tracking-[-20px]"
              >
                {word}
              </h1>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        {images.map((src, index) => (
          <img
            key={index}
            ref={(el) => {
              if (el) imagesRefs.current[index] = el;
            }}
            src={src}
            alt={`Trail ${index + 1}`}
            className="absolute max-w-[200px] opacity-0"
          />
        ))}
      </div>
    </div>
  );
};

export default MarqueeWithImageTrail;

