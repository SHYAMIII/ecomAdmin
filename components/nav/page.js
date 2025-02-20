"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Nav = ({ show }) => {
  const pathname = usePathname();
  const router = useRouter();

  const inactiveLink = "flex gap-3 items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300";
  const activeLink = "flex gap-3 items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-lg";

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <motion.aside
      // initial={{ x: -250 }}
      // animate={{ x: show ? 0 : -250 }}
      transition={{ duration: 0.3 }}
      className="text-white p-6 h-full bg-gray-900 fixed md:static md:w-64 w-3/4 top-0 left-0 z-50 shadow-lg"
    >
      {/* Logo Section */}
      <div className="flex justify-center items-center mb-8">
        <Link href="/" className="flex items-center text-2xl font-bold text-green-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72" />
          </svg>
          <span className="ml-2">Admin</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3">
        {[
          { label: "WELCOME", href: "/", icon: "🏠" },
          { label: "ORDERS", href: "/Orders", icon: "📦" },
          { label: "PRODUCTS", href: "/Products", icon: "🛒" },
          { label: "CATEGORIES", href: "/Categories", icon: "📂" },
          { label: "SETTINGS", href: "/Settings", icon: "⚙️" },
        ].map(({ label, href, icon }) => (
          <Link key={href} href={href} className={pathname === href ? activeLink : inactiveLink}>
            <span className="text-lg">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 w-full flex gap-3 justify-center items-center bg-red-600 hover:bg-red-700 transition-all px-4 py-2 rounded-lg shadow-lg font-bold"
        onClick={logout}
      >
        🚪 LOG OUT
      </motion.button>
    </motion.aside>
  );
};

export default Nav;
