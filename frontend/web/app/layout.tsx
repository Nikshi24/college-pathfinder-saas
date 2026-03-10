"use client";

import { useState } from "react";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar") === "collapsed";
    }
    return false;
  });

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);

    if (newState) {
      localStorage.setItem("sidebar", "collapsed");
    } else {
      localStorage.setItem("sidebar", "expanded");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <html lang="en">
      <body className="flex min-h-screen">

        {/* Sidebar */}
        <aside
          className={`bg-black text-white flex flex-col transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
          }`}
        >

          {/* Collapse Button */}
          <button
            onClick={toggleSidebar}
            className="p-4 hover:bg-gray-800"
          >
            ☰
          </button>

          {/* Navigation */}
          <nav className="flex flex-col gap-6 p-4">

            <Link
              href="/dashboard"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <span>🏠</span>
              {!collapsed && <span>Dashboard</span>}
            </Link>

            <Link
              href="/colleges"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <span>🎓</span>
              {!collapsed && <span>Search Colleges</span>}
            </Link>

            <Link
              href="/saved"
              className="flex items-center gap-3 hover:text-gray-300"
            >
              <span>⭐</span>
              {!collapsed && <span>Saved Colleges</span>}
            </Link>

          </nav>

          {/* Logout */}
          <button
            onClick={logout}
            className="mt-auto p-4 flex items-center gap-3 hover:text-gray-300"
          >
            <span>🚪</span>
            {!collapsed && <span>Logout</span>}
          </button>

        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-10">
          {children}
        </main>

      </body>
    </html>
  );
}