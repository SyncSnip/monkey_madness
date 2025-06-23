"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

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
    { name: "Contact", href: "#contact", section: "contact" },
  ];


  console.log(process.env.EMAIL_USER,'user');

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
              <span className="block">From</span>
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
                Mad Ideas
              </motion.span>
              <span className="block">to Serious Impacts</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-800 font-medium mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Strategic, Creative, and Results-Oriented Brand Management and
              Marketing Solutions.
            </motion.p>

          </motion.div>
        </div>

      </section>
    </>
  );
};

// Enhanced About Section with creative layout
const AboutSection = () => {
  const features = [
    {
      title: "The Brains Behind the Brand Buzz",
      description:
        "Started in a jungle, now swinging through the digital world.",
      icon: "📖",
    },
    {
      title: "Mission",
      description:
        "To empower brands with tailored marketing and branding solutions that drive measurable growth and meaningful audience connections",
      icon: "🎯",
    },
    {
      title: "Vision",
      description:
        "To be a leading force in redefining brand growth and audience engagement across industries",
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
            Meet <span className="text-[#fed231]">the Mischief Makers</span>
          </motion.h2>
          <motion.p
            className="text-2xl text-gray-600 max-w-3xl mx-auto font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Welcome to Monkey Madness
          </motion.p>
          <motion.p
            className="text-2xl text-gray-600 max-w-3xl mx-auto font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            where brand chaos turns into pure activation genius.
          </motion.p>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            We&apos;re not your usual marketing monkeys
          </motion.p>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            we&apos;re the wild ones who thrive on the ground, where the action
            happens and the buzz begins.
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
            {/* {features.map((feature, i) => ( */}
            <motion.div
              className="bg-gray-50 p-6 rounded-2xl shadow-md border-l-4 border-[#fed231]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start">
                <span className="text-3xl mr-4">🎯</span>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    The Brains Behind the Brand Buzz
                  </h4>
                  <p className="text-gray-700">
                    At Monkey Madness, we specialize in on-ground brand
                    activations, festival partnerships, college takeovers, and
                    customized physical campaigns that get people talking.
                  </p>
                  <p className="text-gray-700 mt-2">
                    Whether it&apos;s showcasing your brand at a college fest,
                    curating the perfect pop-up at a music festival, or getting
                    artists to shout your name from the rooftops - we&apos;re
                    the brand-doers who don&apos;t just plan your presence, but
                    make it impossible to ignore.
                  </p>
                  <p className="text-gray-700 mt-2">
                    {" "}
                    While our approach is creative and energetic, our execution
                    is rooted in strategy - it&apos;s madness with metrics.
                    Every campaign we create is backed by data and built for
                    measurable outcomes. Because buzz is fun, but results are
                    cooler.
                  </p>
                </div>
              </div>
            </motion.div>
            {/* ))} */}
          </motion.div>
        </div>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            className="text-2xl text-gray-600 max-w-3xl mx-auto font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            If your brand is ready to get off the screen and into the scene
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let&apos;s{" "}
            <span className="text-[#fed231]">create some Monkey Madness.</span>
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Services Section with interactive cards
const ServicesSection = () => {
  const services = [
    {
      title: "On-Ground Brand Activations",
      description:
        "Immersive, high-impact experiences that connect your brand with real audiences in real time.",
      icon: "🎯",
      color: "bg-purple-100",
    },
    {
      title: "Custom Campaigns",
      description:
        "Tailor-made physical marketing campaigns designed to spark engagement and drive results.",
      icon: "🛠️",
      color: "bg-blue-100",
    },
    {
      title: "Experiential Pop-Ups",
      description:
        "Interactive setups that bring your brand story to life — fun, bold, and built for buzz.",
      icon: "🎪",
      color: "bg-pink-100",
    },
    {
      title: "Brand Integrations",
      description:
        "Seamless placement of your brand across event properties, ensuring visibility and relevance.",
      icon: "🔗",
      color: "bg-green-100",
    },
    {
      title: "Artist Endorsements",
      description:
        "Get the right voices behind your brand with curated collaborations and influencer tie-ups.",
      icon: "🎤",
      color: "bg-yellow-100",
    },
    {
      title: "Digital Exposure and Social Buzz",
      description:
        "Strategic collaborations that put your brand center stage at youth-driven events and cultural hotspots.",
      icon: "📣",
      color: "bg-red-100",
    },
    {
      title: "Data & Impact Reporting",
      description:
        "Post-activation insights and analytics to measure performance, reach, and ROI.",
      icon: "📈",
      color: "bg-purple-100",
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
            Our <span className="text-[#fed231]"> Services</span>
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
              
              </div>
            </motion.div>
          ))}
        </div>
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("🟡 Submitting form...");
    console.log("📨 Form Data:", formData);

    try {
      const res = await fetch("/api/contactNodemailer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("📩 Response status:", res.status);

      if (res.ok) {
        console.log("✅ Email sent successfully");
        toast.success("Message sent successfully 🚀");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorText = await res.text();
        console.error("❌ Server error:", errorText);
        toast.error("Something went wrong.");
      }
    } catch (err) {
      console.error("🔴 Network error:", err);
      toast.error("Network error.");
    } finally {
      setIsSubmitting(false);
      console.log("🔚 Submission completed");
    }
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
            Together! Let&apos;s Make Some{" "}
            <span className="text-[#fed231]">Madness</span> Together
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left */}
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
                    info@monkeymadness.in
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-2xl mr-4">🏢</span>
                <div>
                  <h4 className="text-lg font-bold">Office</h4>
                  <p className="text-gray-300">
                    A5, Grovy Optiva, Noida – 68, Uttar Pradesh - 201301, India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="text-lg font-bold mb-4">Follow Us at :</h4>
              <div className="flex space-x-6 items-center">
                <motion.a
                  href="https://www.linkedin.com/company/monkey-madness-pvt-ltd/"
                  className="flex items-center space-x-2 text-2xl text-gray-400 hover:underline"
                  whileHover={{ y: -5, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                  <span className="text-base font-medium">LinkedIn</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right (Form) */}
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
    <footer className="bg-gray-900 text-white pt-10 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/monkey.png"
              width={180}
              height={40}
              alt="Monkey Madness Logo"
              className="filter invert"
            />
          </div>
          <p className="text-gray-400 mb-6">
            From Mad Ideas to Serious Impacts
          </p>
        </motion.div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-gray-500 mb-4 md:mb-0 text-center w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            © {currentYear} Monkey Madness Pvt Ltd. All rights reserved.
          </motion.p>
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
      <ContactSection />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
