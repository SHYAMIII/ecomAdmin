"use client"
import Layout from "@/components/layout/page";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex justify-between items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white p-6 rounded-lg shadow-lg animate-fade-in">
        <h2 className="text-2xl font-semibold tracking-wide">
          Welcome, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 shadow-md hover:bg-gray-700 transition-all">
          <img src={session?.user?.image} alt="Profile" className="w-10 h-10 rounded-full" />
          <span className="ml-3 text-lg font-medium">{session?.user?.name}</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-4xl font-extrabold text-gray-100 drop-shadow-lg mb-4 animate-slide-in">Admin Dashboard</h1>
        <p className="text-lg text-gray-300">You are logged in as an admin</p>
      </div>
    </Layout>
  );
}
