"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/Header";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/login", { email, password });
      console.log(res.data);
      setLoading(false);
      router.push("/admin/dashboard");
      // router.push("/NewDashboard");
    } catch (error: any) {
      setLoading(false);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Invalid credentials");
      }
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-full max-w-sm p-8 rounded-2xl border border-slate-700 shadow-2xl
                        bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,.25),#020617)]">
          <h1 className="text-white font-bold text-xl mb-1">Admin Login</h1>

          <p className="mb-5">
            <strong className="text-gray-400 text-sm mb-4">Use</strong>  <strong className="text-blue-400">admin@demo.com</strong> / <strong className="text-blue-400">password123</strong>
          </p>

          <form onSubmit={handleSubmit} className="grid gap-4">

            <div className="grid gap-1">
              <label className="text-gray-300 text-xs">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-900/80 border border-blue-900 text-gray-200 
                           rounded-full px-3 py-2 text-sm outline-none"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-gray-300 text-xs">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-900/80 border border-blue-900 text-gray-200 
                           rounded-full px-3 py-2 text-sm outline-none"
              />
            </div>
           {error && (
              <div className="text-red-400 text-xs -mt-1">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full py-2 font-semibold text-slate-900 
                         bg-gradient-to-r from-blue-500 to-green-400
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
