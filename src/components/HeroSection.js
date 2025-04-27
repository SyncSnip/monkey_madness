"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Loader from "./Loader";

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Talent", href: "/talent" },
    { name: "Brands", href: "/brands" },
    { name: "Strategic Advisory", href: "/strategicadvisory" },
    { name: "Careers", href: "/careers" },
    { name: "NewsKiosk", href: "/news" },
    { name: "CSR", href: "/csr" },
    { name: "Contact", href: "/contact" }, // Fixed capitalization
  ];

  // Animation variants for right navbara
  const menuVariants = {
    closed: {
      x: "100%", // Start off-screen to the right
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    open: {
      x: 0, // Slide in to position
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for left content panel
  const contentVariants = {
    closed: {
      x: "-100%", // Start off-screen to the left
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    open: {
      x: 0, // Slide in to position
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  // Animation variants for individual nav links
  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  // Animation variants for hero image
  const imageVariants = {
    initial: { opacity: 0.3, scale: 0.8 },
    animate: {
      opacity: 0.9,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (window.innerWidth >= 768) {
      setIsContentOpen(!isContentOpen);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="relative min-h-screen bg-[#f6f7f7]">
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/">
                <Image
                  src="/navLogo.png"
                  width={120}
                  height={40}
                  className="md:w-32 w-24" // Fixed Tailwind classes
                  alt="Logo"
                />
              </Link>
              <button
                onClick={openMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                className="text-gray-800 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        {/* Right Sidebar Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed top-0 right-0 h-full md:w-1/2 w-full bg-[#f6f7f7] text-gray-700 z-50 shadow-2xl"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <div className="flex flex-col md:ml-20 ml-5 justify-center h-full space-y-8">
                {navLinks.map((link, i) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    <Link href={link.href} className="space-x-4">
                      <span className=" py-2.5 px-4 rounded-full text-xs text-gray-700 opacity-35">
                        0{i + 1}
                      </span>
                      <span
                        className="md:text-2xl text-xl font-semibold hover:text-gray-300 transition-colors cursor-pointer"
                        onClick={() => openMenu()}
                      >
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              {/* Close Button */}
              <button
                onClick={() => openMenu()}
                className="absolute top-8 right-8 text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                <svg
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Left Content Panel */}
        <AnimatePresence>
          {isContentOpen && (
            <motion.div
              className="fixed top-0 left-0 h-full w-1/2 md:block hidden bg-gradient-to-b bg-white text-gray-800 z-50 shadow-2xl"
              initial="closed"
              animate="open"
              exit="closed"
              variants={contentVariants}
            >
              <div className="flex flex-col items-center justify-center h-full p-6">
                <img
                  src="/logoWhiteHeaven.png"
                  className="w-[50%]"
                  alt="Logo"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Hero Section */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center h-full p-6">
            <img
              src="/logoWhiteHeaven.png"
              className="md:w-[30%] "
              alt="Logo"
            />
            <span className="text-center  w-[80%] md:w-[50%] mt-4 text-sm md:text-md text-slate-600 opacity-80">
              White Heaven Entertainments Pvt. Ltd., a premier artist curation
              and programming company dedicated to delivering unforgettable
              entertainment experiences since 2013. Our mission is to curate
              exceptional artists and create immersive events that captivate
              audiences worldwide.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
