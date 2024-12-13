"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  { path: "/", label: "HOME" },
  { path: "/work", label: "WORK" },
  { path: "/about", label: "ABOUT" },
  { path: "/blog", label: "BLOG" },
  { path: "/contact", label: "CONTACT" },
];
const socialLinks = [
  { href: "https://www.instagram.com/rakibul_islam_sarkar/", label: "Instagram" },
  { href: "https://x.com/Rakibul1019", label: "Twitter" },
  { href: "www.linkedin.com/in/rakibul-islam-sarkar-356aa5256", label: "LinkedIn" },
  { href: "https://dribbble.com/Kozuki_Oden", label: "Dribbble" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const container = useRef(null);
  const tl = useRef<gsap.core.Timeline>();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // GSAP Animation for the Menu
  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuOpen && tl.current) {
      tl.current.play();
    } else if (tl.current) {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  // Scroll Detection for Navbar Visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsNavbarVisible(false);
      } else {
        // Scrolling up
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="font-sans antialiased" ref={container}>
      {/* Top Navigation Bar */}
      <div
        className={`fixed top-0 left-0 w-screen p-5 flex justify-between items-center z-10 transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link href="/" className="text-black uppercase text-sm font-medium">
          rakibul islam sarkar
        </Link>
        <button
          onClick={toggleMenu}
          className="text-black uppercase text-sm font-medium cursor-pointer mr-5"
        >
          Menu
        </button>
      </div>

      {/* Menu Overlay */}
      <div
        className={`menu-overlay fixed inset-0 w-screen h-screen z-20 bg-gradient-to-b from-[#c8ff00] to-[#96c700] ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        }}
      >
        <div className="w-full h-full flex flex-col">
          {/* Overlay Header */}
          <div className="flex justify-between p-8">
            <Link href="/" className="text-black uppercase text-sm font-medium">
              rakibul islam sarkar
            </Link>
            <button
              onClick={toggleMenu}
              className="text-black uppercase text-sm font-medium cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col items-center">
            <nav className="space-y-2 px-4 lg:px-0 lg:ml-[-20em] max-w-full">
              {menuLinks.map((link, index) => (
                <div
                  key={index}
                  className="overflow-hidden w-max [clip-path:polygon(0_0,_100%_0,_100%_100%,_0%_100%)] block text-black text-[80px] hover:opacity-60 transition-opacity leading-[82%] tracking-[-0.02em] relative"
                >
                  <div className="menu-link-item-holder">
                    <Link
                      href={link.path}
                      className="text-black text-[80px] font-normal cursor-pointer"
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </Link>
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Footer Section */}
          <nav aria-label="Social media links" className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 mb-6">
  <div className="menu-info flex flex-col md:flex-row justify-between w-full max-w-5xl font-medium leading-3 space-y-4 md:space-y-0">
    <ul className="menu-info-col flex flex-col space-y-2">
      {socialLinks.map((link) => (
        <li key={link.href} className="flex items-center space-x-2">
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase text-sm md:text-base flex items-center space-x-2 hover:underline"
          >
            <span>{link.label}</span>
            <MoveUpRight size={12} strokeWidth={2.5} />
          </Link>
        </li>
      ))}
    </ul>
    <div className="menu-info-col flex flex-col space-y-2 items-start md:items-center text-sm md:text-base">
      <p className="uppercase">rakibulislam1019@gmail.com</p>
      <p>2342 232 343</p>
    </div>
  </div>
  <div className="menu-preview text-center mt-6 md:mt-0">
    <p className="text-black text-lg md:text-xl font-semibold cursor-pointer">
      View Showreel
    </p>
  </div>
</nav>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
