"use client";

import React, { FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  ArrowRight,
  PlayCircle,
  Check,
  Calendar,
  MapPin,
  UserCircle,
  Store,
  Play,
  MessageSquare,
  ShoppingCart,
  Bell,
  Clock,
  UserPlus,
  Mail,
  Linkedin,
  Twitter,
  Github,
  Instagram,
} from "lucide-react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./signin.module.scss"
import axios from "axios";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Home = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // signin form submit handler
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res.data?.token) {
        localStorage.setItem("auth_token", res.data.token);
      }
      setEmail("");
      setPassword("");
      toast.success("Login successful!", { duration: 3000 });
      setIsModalOpen(false);
      router.push("/");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Invalid email or password";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }


  // signup form state and submit handler
  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [phone, setPhone] = useState("");
  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/signup`,
        {
          name,
          email: signupEmail,
          password: signupPassword,
          phone,
        }
      );
      toast.success(res?.data?.message || "Account created successfully!", { duration: 2000 });
      setName("");
      setSignupEmail("");
      setSignupPassword("");
      setPhone("");
      setTimeout(() => {
        setIsSignupOpen(false);
        setIsModalOpen(true);
        setLoading(false);
      }, 2000);
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  }

  // google login handler
  const handleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/googlemessage`,
        {
          token: credentialResponse.credential, // ⚠️ must send token!
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
      router.push("/login");
    }
  };
  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => toast.error("Google Sign-In failed"),
  });


  return (
    <div className="min-h-screen bg-white font-sans selection:bg-purple-100 selection:text-purple-600">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="">
                <Image
                  src={"/logo.jpeg"}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-xl"
                />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                Tronex
              </span>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              {["Features", "AI Agents", "How It Works", "Pricing"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>
            <div className="flex items-center space-x-4">
              <button
                className="text-gray-700 font-medium hover:text-purple-600 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                Sign In

              </button>
              <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-200 transition-all active:scale-95">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal  Sign In*/}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              className="absolute top-4 right-5 text-red-700 hover:text-red-900"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-5 block bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-blue-400">Sign In</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.inputField}
                />
                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <p className="text-gray-500 text-end text-sm">Forget Password?</p>
              {/* {error && <div className={styles.error}>{error}</div>} */}
              <button
                type="submit"
                disabled={loading}
                className={styles.loginButton}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Don't have an account? Please {" "}
                <button
                  className="text-2sm font-medium mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
                  onClick={() => {
                    setIsModalOpen(false)
                    setIsSignupOpen(true)
                  }}>
                  Sign Up</button>
              </p>
              {/* Continue with the Google */}
              <button
                type="button"
                onClick={() => login()}
                className={styles.googleButton}
              >
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Modal  Sign Up */}
      {isSignupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            <button
              className="absolute top-4 right-5 text-red-700 hover:text-red-900"
              onClick={() => setIsSignupOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-blue-400">
              Create Account
            </h2>
            <form className={styles.form} onSubmit={handleSignup}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input
                  type="number"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // allow only numbers
                    if (value.length <= 10) setPhone(value);
                  }}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
              </div>
               <div className={styles.inputWrapper}>
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                  className={styles.inputField}
                />
                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <button type="submit" className={styles.loginButton}>
                Sign Up
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
                  onClick={() => {
                    setIsSignupOpen(false)
                    setIsModalOpen(true)
                  }}
                >
                  Sign In
                </button>
              </p>
              <button
                type="button"
                onClick={() => login()}
                className={styles.googleButton}
              >
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-[10%] w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm"
              >
                <Sparkles size={16} className="text-purple-600" />
                <span>AI-Powered Automation</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1]"
              >
                Your Personal AI Agents for
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                  Every Task
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl"
              >
                Deploy intelligent AI agents across WhatsApp, Telegram, and
                more. Automate appointments, find products, and manage your
                business with conversational AI.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-200 transition-all flex items-center justify-center group">
                  Start Free Trial
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white border-2 border-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-purple-600 hover:text-purple-600 transition-all flex items-center justify-center">
                  <PlayCircle className="mr-2" /> Watch Demo
                </button>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-center space-x-6"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-${i}.jpg`}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      alt={`User ${i}`}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 mb-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Sparkles
                        key={i}
                        size={14}
                        fill="currentColor"
                        className="text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    Trusted by{" "}
                    <span className="text-gray-900">10,000+ businesses</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: [0, -15, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                x: { duration: 0.8, delay: 0.2 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
                      <MessageSquare className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 leading-none">
                        WhatsApp Assistant
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                        <p className="text-xs text-green-600 font-medium">
                          Active now
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 max-w-[85%] border border-gray-100/50">
                    <p className="text-sm text-gray-700">
                      Hi! I need to book a dental appointment for tomorrow.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-2xl rounded-tr-none p-4 max-w-[85%] ml-auto shadow-lg shadow-purple-100">
                    <p className="text-sm font-medium leading-relaxed">
                      I found 3 available slots tomorrow. Dr. Smith has 10 AM, 2
                      PM, and 4 PM open. Which works best for you?
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 max-w-[85%] border border-gray-100/50">
                    <p className="text-sm text-gray-700">
                      2 PM would be perfect!
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-2xl rounded-tr-none p-4 max-w-[85%] ml-auto shadow-lg shadow-purple-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <Check size={14} className="text-purple-200" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Confirmed
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      ✓ Booked! Your appointment with Dr. Smith is confirmed for
                      tomorrow at 2 PM. I'll send you a reminder 1 hour before.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            >
              Powerful AI Agents for Every Need
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Deploy intelligent assistants across multiple platforms to
              automate your workflows and enhance customer experience.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "WhatsApp Agent",
                icon: MessageSquare,
                style: {
                  card: "from-green-50 to-white border-green-100",
                  iconBg: "bg-green-500",
                  check: "text-green-500",
                },
                features: [
                  "Automated responses",
                  "Appointment booking",
                  "Order management",
                ],
                desc: "Deploy conversational AI on WhatsApp to handle customer queries, book appointments, and process orders 24/7.",
              },
              {
                title: "Telegram Assistant",
                icon: Bell,
                style: {
                  card: "from-blue-50 to-white border-blue-100",
                  iconBg: "bg-blue-500",
                  check: "text-blue-500",
                },
                features: [
                  "Task automation",
                  "Group management",
                  "Instant notifications",
                ],
                desc: "Intelligent bot for Telegram that manages tasks, schedules, and provides instant information to your community.",
              },
              {
                title: "Clinic Appointment Agent",
                icon: Calendar,
                style: {
                  card: "from-purple-50 to-white border-purple-100",
                  iconBg: "bg-purple-600",
                  check: "text-purple-600",
                },
                features: [
                  "Smart scheduling",
                  "Automated reminders",
                  "Patient management",
                ],
                desc: "Smart scheduling system for healthcare providers. Manage appointments, send reminders, and reduce no-shows.",
              },
              {
                title: "Local Product Finder",
                icon: MapPin,
                style: {
                  card: "from-orange-50 to-white border-orange-100",
                  iconBg: "bg-orange-500",
                  check: "text-orange-500",
                },
                features: [
                  "Location-based search",
                  "Contact information",
                  "Real-time availability",
                ],
                desc: "AI-powered search that finds nearby products and services using Google Maps API with instant contact details.",
              },
              {
                title: "Personal Secretary",
                icon: UserCircle,
                style: {
                  card: "from-pink-50 to-white border-pink-100",
                  iconBg: "bg-pink-500",
                  check: "text-pink-500",
                },
                features: [
                  "Email management",
                  "Calendar sync",
                  "Task prioritization",
                ],
                desc: "Your 24/7 digital assistant that manages your schedule, handles emails, and keeps you organized.",
              },
              {
                title: "Business Automation",
                icon: Store,
                style: {
                  card: "from-indigo-50 to-white border-indigo-100",
                  iconBg: "bg-indigo-600",
                  check: "text-indigo-600",
                },
                features: [
                  "Inventory tracking",
                  "Customer insights",
                  "Sales analytics",
                ],
                desc: "Complete business automation suite with inventory management, customer support, and analytics.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`group bg-gradient-to-br ${feature.style.card} p-8 rounded-3xl border transition-all hover:shadow-xl`}
              >
                <div
                  className={`w-14 h-14 ${feature.style.iconBg} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}
                >
                  <feature.icon className="text-white w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {feature.desc}
                </p>
                <ul className="space-y-3">
                  {feature.features.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm font-medium text-gray-600"
                    >
                      <Check
                        size={16}
                        className={`${feature.style.check} mr-3`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-gray-50/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-purple-100 overflow-hidden max-w-5xl mx-auto border border-white p-4">
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-500 rounded-[2rem] flex items-center justify-center relative group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                <img
                  className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 opacity-60"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6dc45d8c09-b87b9327edc5f6a9c79d.png"
                  alt="Dashboard Preview"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl z-20"
                >
                  <Play
                    className="text-purple-600 w-8 h-8 ml-1"
                    fill="currentColor"
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              {
                num: "1",
                title: "Choose Your Agent",
                content:
                  "Select from our library of pre-built AI agents or create a custom one tailored to your specific needs.",
              },
              {
                num: "2",
                title: "Connect & Configure",
                content:
                  "Link your WhatsApp, Telegram, or other platforms. Customize responses, workflows, and integrations.",
              },
              {
                num: "3",
                title: "Launch & Scale",
                content:
                  "Deploy your AI agent instantly and watch it handle thousands of conversations simultaneously.",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-8 text-white text-2xl font-bold shadow-xl shadow-purple-100 rotate-3">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {step.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Starter */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-xl shadow-gray-100/50"
            >
              <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-widest">
                Starter
              </h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">$49</span>
                <span className="text-gray-500 font-medium">/month</span>
              </div>
              <ul className="space-y-5 mb-10">
                {[
                  "1 AI Agent",
                  "1,000 conversations/mo",
                  "WhatsApp integration",
                  "Basic analytics",
                  "Email support",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-gray-600 font-medium"
                  >
                    <Check className="text-green-500 mr-3 w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all">
                Get Started
              </button>
            </motion.div>

            {/* Professional */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-600 to-blue-500 rounded-[2.5rem] p-12 relative shadow-2xl shadow-purple-200 z-10 border border-purple-400/20"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-lg">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-purple-200 mb-2 uppercase tracking-widest">
                Professional
              </h3>
              <div className="mb-8 text-white">
                <span className="text-6xl font-bold">$149</span>
                <span className="text-purple-200 font-medium opacity-80">
                  /month
                </span>
              </div>
              <ul className="space-y-5 mb-10">
                {[
                  "5 AI Agents",
                  "10,000 conversations/mo",
                  "All platforms",
                  "Advanced analytics",
                  "Priority support",
                  "Custom workflows",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-white font-medium"
                  >
                    <Check className="text-yellow-400 mr-3 w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-white text-purple-600 font-bold hover:bg-yellow-400 hover:text-gray-900 transition-all shadow-lg">
                Start Free Trial
              </button>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-xl shadow-gray-100/50"
            >
              <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-widest">
                Enterprise
              </h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">Custom</span>
              </div>
              <ul className="space-y-5 mb-10">
                {[
                  "Unlimited AI Agents",
                  "Unlimited conversations",
                  "White-label solution",
                  "Custom integrations",
                  "Dedicated manager",
                  "24/7 phone support",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-gray-600 font-medium"
                  >
                    <Check className="text-green-500 mr-3 w-5 h-5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-lg">
                Contact Sales
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl lg:text-7xl font-extrabold text-white mb-8 leading-[1.1]">
                Ready to transform your business?
              </h2>
              <p className="text-xl text-purple-200 mb-12 font-medium opacity-90">
                Join 10,000+ companies automating their customer interactions
                with Tronex. Get started today and scale your business with AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-purple-900 px-10 py-5 rounded-2xl font-black text-xl hover:bg-yellow-400 hover:text-gray-900 transition-all shadow-2xl flex items-center justify-center">
                  Get Started Now <ArrowRight size={24} className="ml-3" />
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all flex items-center justify-center">
                  Book a Demo
                </button>
              </div>
              <p className="mt-8 text-purple-300 font-medium flex items-center justify-center space-x-6">
                <span>Free 14-day trial</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-50"></span>
                <span>No credit card required</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-50"></span>
                <span>Cancel anytime</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="bg-gray-900 text-gray-300 border-t border-gray-800 pt-24 pb-12 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/20">
                  <Brain className="text-white w-7 h-7" />
                </div>
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  Tronex
                </span>
              </div>
              <p className="text-gray-400 font-medium leading-relaxed max-w-xs mb-8">
                The world's leading AI agent platform for modern businesses.
                Automate anything, anywhere.
              </p>
              <div className="flex items-center space-x-4">
                {[Twitter, Linkedin, Github, Instagram].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
                Product
              </h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    AI Agents
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
                Company
              </h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
                Legal
              </h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
                Support
              </h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    API Docs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 font-medium text-sm">
              © 2024 Tronex AI. Built with ❤️ for the future of business.
            </p>
            <div className="flex items-center space-x-6 text-sm font-bold text-gray-500">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>{" "}
                System Status
              </span>
              <span>English (US)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles for blobs */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Home;
