"use client"
import Layout from "@/components/layout/page";
import Nav from "@/components/nav/page";
import { useSession, signIn, signOut } from "next-auth/react"




export default function Home() {
  const { data: session } = useSession();
  return (

    <Layout>
      <div className="text-blue-900 justify-between flex">
        <h2 className="text-xl font-bold">
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex justify-between bg-slate-400 rounded-lg text-black items-center overflow-hidden   font-bold">
          
          <div><img src={session?.user?.image} alt="" className="w-9 h-9" /></div>
          <span className="px-2">{session?.user?.name}</span>
        </div>
        </div>
        <div className="min-h-screen w-full items-center justify-center flex flex-col">
          <h1 className="text-3xl font-bold">Welcome Admin</h1>
          <p className="text-xl">You are logged in as an admin</p>
      </div>
    </Layout>
  )
}
