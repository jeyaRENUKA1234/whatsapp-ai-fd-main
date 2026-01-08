"use client";

import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FiBarChart2,
  FiCpu,
  FiMessageCircle,
  FiBookOpen,
  FiSettings,
  FiTrendingUp,
  FiLink,
  FiMenu,
  FiX,
  FiChevronRight,
  FiChevronLeft,
  FiChevronDown,
} from "react-icons/fi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  async function handleLogout() {
    await axios("/api/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function NavItem({
    href,
    icon: Icon,
    label,
  }: { href: string; icon: any; label: string }) {
    const isActive = pathname === href;

    return (
      <li
        className={`
          flex items-center px-3 py-2 rounded-xl cursor-pointer transition font-bold
          ${isActive
            ? " text-black bg-gray-400 hover:bg-gray-400 hover:text-white shadow-md"
            : "text-black hover:bg-gray-400 hover:text-white"
          }
        `}
        onClick={() => setOpen(false)}
      >
        <Icon className="mr-2 text-[#3b82f6]" size={22} />
        <Link href={href}>{label}</Link>
      </li>
    );
  }

  return (
    <div
      // className="min-h-screen bg-white grid md:grid-cols-[255px_1fr]"
      className={`min-h-screen bg-white grid transition-all duration-300
    ${collapsed
          ? "md:grid-cols-[80px_1fr]"
          : "md:grid-cols-[255px_1fr]"
        }
  `}
    >
      <aside
        className={`
          bg-gray-100 border-r border-slate-300 border-r border-slate-600/30 p-3 flex flex-col
          md:static md:translate-x-0 text-white
          fixed top-0 left-0 h-full w-64 z-50 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
           ${collapsed ? "w-20" : "w-64"}
        `}
      >
        {/* Close btn on mobile */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden text-black self-end mb-3"
        >
          <FiX size={26} />
        </button>
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
                  self-end mb-2 p-1 rounded-md
                  text-[#3b82f6] hover:text[#3b82f6]
                  hover:bg-purple-100 transition
                "
        >
          {collapsed ? <FiChevronRight size={22} /> : <FiChevronLeft size={22} />}
        </button>
        <div className="flex flex-col items-center justify-center mb-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center
            font-bold bg-gradient-to-r from-[#3b82f6] to-[#9333ea] text-white shadow-2xl text-lg">
            A
          </div>
          {!collapsed && (
            <div className="text-black font-bold text-lg mt-2 text-center">
              AI Admin Panel
            </div>
          )}
        </div>
        <hr className="my-6 border-slate-300" />
        <ul className="grid gap-4 text-white">
          <NavItem href="/admin/dashboard" icon={FiBarChart2} label={!collapsed ? "Dashboard" : ""} />
          <NavItem href="/admin/employees" icon={FiCpu} label={!collapsed ? "AI Employees" : ""} />
          <NavItem href="/admin/conversations" icon={FiMessageCircle} label={!collapsed ? "Conversations" : ""} />
          <NavItem href="/admin/training" icon={FiBookOpen} label={!collapsed ? "Training" : ""} />
          <NavItem href="/admin/rules" icon={FiSettings} label={!collapsed ? "Rules" : ""} />
          <NavItem href="/admin/analytics" icon={FiTrendingUp} label={!collapsed ? "Analytics" : ""} />
          <NavItem href="/admin/settings" icon={FiLink} label={!collapsed ? "Integrations" : ""} />
        </ul>
        <div className="mt-auto pt-5 border-t border-slate-600/40">
          <span className="text-xs text-black">Logged in as</span>
          <strong className="block mt-1 text-black">admin@demo.com</strong>
        </div>
      </aside>
      <main className="flex flex-col h-screen overflow-hidden">
        <header
          className="bg-gray-100 px-4 py-4 border-b border-slate-300
              flex justify-between items-center shadow-md
              h-16 flex-shrink-0"
        >
          {/* Mobile menu */}
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <FiMenu size={28} />
          </button>

          {/* Title */}
          <div className="text-black text-xl font-bold">
            Dashboard
          </div>

          {/* PROFILE */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full
              border text-white bg-[#3b82f6]
              hover:opacity-90"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

      </main>

    </div>
  );
}
