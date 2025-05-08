"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Enhanced Loader with playful monkey animation
const Loader = () => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-[#fed231] z-50"
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative flex flex-col items-center">
      <motion.div
        className="w-24 h-24 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src="/monkeyLogo.png"
          width={80}
          height={80}
          alt="Loading Monkey"
          className="w-20 h-20"
        />
      </motion.div>
    </div>
    <motion.div
      className="absolute bottom-10 text-gray-800 font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Preparing some banana-powered creativity...
    </motion.div>
  </motion.div>
);

// Enhanced Navbar with creative animations
const Navbar = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef();

  const navLinks = [
    { name: "Home", href: "#home", section: "home" },
    { name: "About Us", href: "#about", section: "about" },
    { name: "Services", href: "#services", section: "services" },
    { name: "Our Work", href: "#work", section: "work" },
    { name: "Process", href: "#process", section: "process" },
    { name: "Why Us", href: "#why-us", section: "why-us" },
    { name: "Contact", href: "#contact", section: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      const navbarHeight = 80;
      const offsetPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-3 sm:py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-16">
          <Link
            href="#home"
            onClick={() => handleNavClick("home")}
            className="flex items-center"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring" }}
            >
              <Image
                width={100}
                height={100}
                src="/monkeyLogo.png"
                className="h-12 w-auto sm:h-14 md:h-16"
                alt="White Heaven Logo"
              />
            </motion.div>
          </Link>

          <div className="hidden md:flex space-x-1 relative">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link
                  href={link.href}
                  onClick={() => handleNavClick(link.section)}
                  className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                    activeSection === link.section
                      ? "text-gray-900 bg-[#fed231]"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-800 p-2 rounded-md focus:outline-none"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="h-6 w-6 sm:h-8 sm:w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
                initial={false}
                animate={{
                  d: isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16",
                }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden bg-white shadow-xl rounded-lg mx-4 mt-2 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.section)}
                    className={`block px-4 py-3 rounded-md text-sm sm:text-base font-medium ${
                      activeSection === link.section
                        ? "bg-[#fed231] text-gray-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {link.name}
                    {activeSection === link.section && (
                      <motion.span
                        layoutId="activeMobileNavItem"
                        className="block h-1 w-1/2 bg-gray-900 rounded-full mt-1"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Enhanced Hero Section with playful animations
const HeroSection = ({ setActiveSection, activeSection }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Floating bananas animation

  return (
    <>
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <section
        id="home"
        className="relative min-h-screen bg-gradient-to-b from-[#fed231] to-[#f7c02a] pt-20 overflow-hidden"
      >
        {/* Monkey character animation */}
        <div className="container mx-auto flex flex-col items-center justify-center min-h-[90vh] relative z-10 px-4">
          <motion.div
            className="text-center max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <Image
                src="/monkey.png"
                width={400}
                height={400}
                className="w-150 h-auto"
                alt="Logo"
              />
            </div>
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <span className="block">Turning</span>
              <motion.span
                className="inline-block bg-gray-900 text-[#fed231] px-4 py-2 rounded-lg"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  delay: 1.5,
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Monkey Business
              </motion.span>
              <span className="block">Into Brand Business</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-2xl text-gray-800 font-medium mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Strategic, Creative, and Results-Oriented Brand Management and
              Marketing Solutions.
            </motion.p>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, type: "spring" }}
            >
              <Link
                href="#contact"
                onClick={() => setActiveSection("contact")}
                className="inline-flex items-center bg-gray-900 text-[#fed231] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all group"
              >
                Let&apos;s Go Bananas!
                <motion.span
                  className="ml-2 inline-block group-hover:translate-x-2 transition-transform"
                  animate={{
                    rotate: [0, 20, -20, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  🍌
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <span className="text-gray-900 mb-2">Explore More</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

// Enhanced About Section with creative layout
const AboutSection = () => {
  const features = [
    {
      title: "Our Story",
      description:
        "Started in a jungle, now swinging through the digital world.",
      icon: "📖",
    },
    {
      title: "Mission",
      description: "To empower brands with tailored marketing and branding solutions that drive measurable growth and meaningful audience connections",
      icon: "🎯",
    },
    {
      title: "Vision",
      description: "To be a leading force in redefining brand growth and audience engagement across industries",
      icon: "🔭",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            About <span className="text-[#fed231]">Monkey Madness</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Monkey Madness Pvt Ltd was founded with a vision to empower
            businesses with strategic marketing and brand solutions tailored to
            their unique needs. Our focus is on creativity, innovation, and
            measurable outcomes, ensuring every brand we work with stands out
            and grows sustainably in a dynamic market environment.
             At Monkey
            Madness, we believe in meaningful partnerships, fostering
            innovation, and delivering real value through every campaign and
            strategy
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#fed231] rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 text-9xl opacity-10">
                🐒
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Who We Are
              </h3>
              <p className="text-gray-800 mb-6">
                A team of creative primates who eat, sleep, and breathe brand
                strategy. We combine wild creativity with data-driven decisions
                to help your business thrive.
              </p>
              <div className="flex space-x-4">
                {["Creativity", "Strategy", "Results"].map((item, i) => (
                  <motion.span
                    key={item}
                    className="bg-gray-900 text-[#fed231] px-4 py-2 rounded-full text-sm font-medium"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="bg-gray-50 p-6 rounded-2xl shadow-md border-l-4 border-[#fed231]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-4">{feature.icon}</span>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Team stats */}
        <motion.div
          className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Our Jungle Numbers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "50+", label: "Happy Clients" },
              { number: "100+", label: "Projects" },
              { number: "10+", label: "Team Members" },
              { number: "∞", label: "Cups of Coffee" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#fed231] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Services Section with interactive cards
const ServicesSection = () => {
  const services = [
    {
      title: "Brand Strategy",
      description:
        "We craft banana-proof strategies to position your brand for success in the wild digital jungle.",
      icon: "🦧",
      color: "bg-purple-100",
    },
    {
      title: "Digital Marketing",
      description:
        "From SEO to social media, we swing through all digital channels to grow your brand.",
      icon: "🌐",
      color: "bg-blue-100",
    },
    {
      title: "Creative Design",
      description:
        "Eye-catching designs that make your brand stand out in the crowded jungle.",
      icon: "🎨",
      color: "bg-pink-100",
    },
    {
      title: "Content Creation",
      description:
        "Engaging content that tells your brand's story and connects with your tribe.",
      icon: "✍️",
      color: "bg-green-100",
    },
    {
      title: "Social Media",
      description:
        "We'll help you go viral in the monkey community (and your target audience).",
      icon: "📱",
      color: "bg-yellow-100",
    },
    {
      title: "Analytics",
      description:
        "Data-driven insights to track your growth and optimize your strategy.",
      icon: "📊",
      color: "bg-red-100",
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our <span className="text-[#fed231]">Banana Services</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            We offer a full range of marketing services to help your brand climb
            to the top of the tree.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10 }}
            >
              <div
                className={`${service.color} p-8 rounded-3xl shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-xl`}
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-6 flex-grow">
                  {service.description}
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-[#fed231] font-bold flex items-center"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Work Section with creative showcase
const WorkSection = () => {
  const projects = [
    {
      title: "Jungle Juice Co.",
      description: "Rebranding for an organic juice company",
      category: "Branding",
      result: "300% growth in 6 months",
    },
    {
      title: "Banana Tech",
      description: "Digital marketing for a tech startup",
      category: "Digital Marketing",
      result: "2M+ impressions",
    },
    {
      title: "Monkey Fitness",
      description: "Social media strategy for a fitness brand",
      category: "Social Media",
      result: "50K new followers",
    },
    {
      title: "Treetop Café",
      description: "Website design for a boutique café",
      category: "Web Design",
      result: "120% more bookings",
    },
    {
      title: "Vine Ventures",
      description: "Content strategy for a VC firm",
      category: "Content",
      result: "3x engagement",
    },
    {
      title: "Ape Apparel",
      description: "E-commerce strategy for clothing brand",
      category: "E-commerce",
      result: "75% revenue increase",
    },
  ];

  return (
    <section id="work" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our <span className="text-[#fed231]">Jungle Portfolio</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            See how we&apos;ve helped brands swing to new heights.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg h-full flex flex-col">
                <div className="h-48 bg-gradient-to-r from-[#fed231] to-[#f7c02a] flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-8xl">
                      {["🦍", "🦧", "🐒", "🙈", "🙉", "🙊"][index % 6]}
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 left-4 bg-gray-900 text-[#fed231] px-3 py-1 rounded-full text-sm font-medium"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {project.category}
                  </motion.div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  <div className="mt-auto">
                    <div className="text-sm text-gray-500 mb-2">Result:</div>
                    <div className="text-lg font-bold text-[#fed231]">
                      {project.result}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="#contact"
            className="inline-flex items-center bg-gray-900 text-[#fed231] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all"
          >
            Ready to see your brand swing higher?
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Process Section with creative timeline
const ProcessSection = () => {
  const steps = [
    {
      title: "Discovery",
      description: "We learn about your brand and goals",
      icon: "🔍",
    },
    {
      title: "Strategy",
      description: "We craft a custom plan for your success",
      icon: "🧠",
    },
    {
      title: "Execution",
      description: "We implement with precision and creativity",
      icon: "🛠️",
    },
    {
      title: "Growth",
      description: "We measure and optimize for continuous improvement",
      icon: "📈",
    },
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our <span className="text-[#fed231]">Banana Process</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            How we turn your brand into the king of the jungle
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#fed231] transform -translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex flex-col md:flex-row items-center justify-center relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* For even steps (left side) */}
                {index % 2 === 0 ? (
                  <>
                    <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0 order-1 md:order-1">
                      <motion.div
                        className="inline-block"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="bg-white p-6 rounded-2xl shadow-lg inline-block max-w-md">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-700">{step.description}</p>
                        </div>
                      </motion.div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 order-2 md:order-2">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-[#fed231] flex items-center justify-center text-3xl shadow-lg"
                        whileHover={{ rotate: 10 }}
                      >
                        {step.icon}
                      </motion.div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="md:w-1/2 md:pr-12 order-2 md:order-1">
                      <motion.div
                        className="w-20 h-20 rounded-full bg-[#fed231] flex items-center justify-center text-3xl shadow-lg ml-auto"
                        whileHover={{ rotate: -10 }}
                      >
                        {step.icon}
                      </motion.div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 md:text-left mb-6 md:mb-0 order-1 md:order-2">
                      <motion.div
                        className="inline-block"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="bg-white p-6 rounded-2xl shadow-lg inline-block max-w-md">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-700">{step.description}</p>
                        </div>
                      </motion.div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Why Choose Us Section with creative comparison
const WhyChooseUsSection = () => {
  const features = [
    {
      title: "Wild Creativity",
      description:
        "We think outside the banana box to deliver unique solutions.",
      icon: "🎨",
    },
    {
      title: "Jungle Expertise",
      description: "Years of experience navigating the digital wilderness.",
      icon: "🌴",
    },
    {
      title: "Banana-Powered Results",
      description: "We deliver measurable growth, not just pretty designs.",
      icon: "📈",
    },
    {
      title: "Tailored Approach",
      description: "Custom strategies for your unique brand needs.",
      icon: "✂️",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Why <span className="text-[#fed231]">Monkey Around</span> With Us?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            We&apos;re not just another agency - we&apos;re your partners in
            growth.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="bg-[#fed231] rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              The Monkey Madness Difference
            </h3>
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <motion.li
                  key={feature.title}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <span className="text-2xl mr-4">{feature.icon}</span>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="text-gray-800">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="bg-gray-900 rounded-3xl p-8 shadow-xl text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#fed231] mb-6">
              Others vs. Us
            </h3>
            <div className="space-y-6">
              {[
                {
                  them: "Cookie-cutter solutions",
                  us: "Tailored strategies",
                },
                {
                  them: "Set it and forget it",
                  us: "Continuous optimization",
                },
                {
                  them: "Just pretty designs",
                  us: "Designs that convert",
                },
                {
                  them: "Slow communication",
                  us: "Quick responses",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <div className="w-1/2 pr-4 border-r border-gray-700">
                    <div className="flex items-center">
                      <span className="text-red-400 mr-2">✗</span>
                      <span className="text-gray-400">{item.them}</span>
                    </div>
                  </div>
                  <div className="w-1/2 pl-4">
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>{item.us}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link
            href="#contact"
            className="inline-flex items-center bg-gray-900 text-[#fed231] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all group"
          >
            Ready to climb higher?
            <motion.span
              className="ml-2 inline-block group-hover:translate-y-1 transition-transform"
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              🚀
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Contact Section with playful elements
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Thanks for reaching out! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });

      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(""), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let&apos;s <span className="text-[#fed231]">Go Bananas</span>{" "}
            Together!
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Have a project in mind? Want to chat about your brand? Throw us a
            banana (or just fill out this form).
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="bg-gray-800 rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#fed231] mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <span className="text-2xl mr-4">📮</span>
                <div>
                  <h4 className="text-lg font-bold">Email</h4>
                  <a
                    href="mailto:hello@monkeymadness.com"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    hello@monkeymadness.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">📞</span>
                <div>
                  <h4 className="text-lg font-bold">Phone</h4>
                  <a
                    href="tel:+11234567890"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">🏢</span>
                <div>
                  <h4 className="text-lg font-bold">Office</h4>
                  <p className="text-gray-300">
                    123 Banana Lane, Jungle City, 10001
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="text-lg font-bold mb-4">
                Follow Our Monkey Business
              </h4>
              <div className="flex space-x-6">
                {[
                  { icon: "📸", label: "Instagram", url: "#" },
                  { icon: "💼", label: "LinkedIn", url: "#" },
                  { icon: "🐦", label: "Twitter", url: "#" },
                  { icon: "📘", label: "Facebook", url: "#" },
                ].map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    className="text-3xl"
                    whileHover={{ y: -5, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    viewport={{ once: true }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#fed231] mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fed231] text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fed231] text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#fed231] text-white"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-[#fed231] text-gray-900 px-6 py-4 rounded-lg font-bold text-lg flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message 🚀"
                )}
              </motion.button>
              {submitMessage && (
                <motion.div
                  className="p-4 bg-green-500/10 text-green-400 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {submitMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Footer with creative elements
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <Image
                src="/monkey.png"
                width={120}
                height={40}
                alt="Monkey Madness Logo"
              />
            </div>
            <p className="text-gray-400 mb-6">
              Turning monkey business into brand success since 2023.
            </p>
            <div className="flex space-x-4">
              {["📸", "💼", "🐦", "📘"].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="text-xl hover:text-[#fed231] transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {[
            {
              title: "Quick Links",
              links: [
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Work", href: "#work" },
                { label: "Contact", href: "#contact" },
              ],
            },
            {
              title: "Services",
              links: [
                { label: "Brand Strategy", href: "#services" },
                { label: "Digital Marketing", href: "#services" },
                { label: "Creative Design", href: "#services" },
                { label: "Content Creation", href: "#services" },
                { label: "Social Media", href: "#services" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
              ],
            },
          ].map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * colIndex }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-[#fed231] mb-6">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * linkIndex }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <span className="mr-2">🍌</span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-gray-500 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            © {currentYear} Monkey Madness Pvt Ltd. All rights reserved.
          </motion.p>
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a
              href="#"
              className="text-gray-500 hover:text-[#fed231] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#fed231] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#fed231] transition-colors"
            >
              Cookies
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "services",
        "work",
        "process",
        "why-us",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans bg-white">
      <HeroSection
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
