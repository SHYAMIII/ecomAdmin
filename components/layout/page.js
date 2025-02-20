"use client"
import Nav from "@/components/nav/page";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react";
import Logo from "../Logo/page";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md"
        >
          <div className="flex flex-col items-center mb-8">
            <Logo className="w-20 h-20 mb-4 text-white" />
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Please sign in to continue</p>
          </div>

          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200"
          >
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="fixed top-0 left-0 right-0 h-16 bg-gray-800 bg-opacity-90 backdrop-blur-md border-b border-gray-700 flex items-center px-4 z-50">
        <button 
          onClick={() => setShowNav(!showNav)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex-1 flex justify-center">
          <Logo className="w-12 h-12 text-white" />
        </div>
      </div>

      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", bounce: 0.2 }}
            className="fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-xl z-50"
          >
            <Nav onClose={() => setShowNav(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16 px-4 md:px-6 lg:px-8 transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 lg:p-10 min-h-[80vh] mt-4 mx-auto max-w-7xl"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
