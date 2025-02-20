"use client"
import Layout from "@/components/layout/page"
import { motion } from "framer-motion"
import React, { useState } from "react"
import { useSession } from "next-auth/react"

const Settings = () => {
  const { data: session } = useSession();
  const [siteTitle, setSiteTitle] = useState("My Admin Dashboard");
  const [adminEmail, setAdminEmail] = useState(session?.user?.email || "");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate saving settings; replace with your API call if needed.
    setTimeout(() => {
      console.log("Settings saved", { siteTitle, adminEmail, notificationsEnabled, darkMode });
      setSaving(false);
      alert("Settings saved successfully!");
    }, 1500);
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg my-8"
      >
        <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
        <form onSubmit={handleSave} className="space-y-6">
          {/* Site Preferences */}
          <div className="p-4 rounded-lg shadow-sm bg-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Site Preferences</h2>
            <label className="block mb-2 text-gray-200">
              Site Title
              <input 
                type="text" 
                value={siteTitle} 
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-600 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </label>
          </div>

          {/* Admin Profile */}
          <div className="p-4 rounded-lg shadow-sm bg-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Admin Profile</h2>
            <label className="block mb-2 text-gray-200">
              Email
              <input 
                type="email" 
                value={adminEmail} 
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-600 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </label>
          </div>

          {/* General Preferences */}
          <div className="p-4 rounded-lg shadow-sm bg-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Preferences</h2>
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <label className="flex items-center text-gray-200">
                <input 
                  type="checkbox" 
                  checked={notificationsEnabled} 
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="mr-2 h-5 w-5"
                />
                Enable Notifications
              </label>
              <label className="flex items-center text-gray-200">
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="mr-2 h-5 w-5"
                />
                Dark Mode
              </label>
            </div>
          </div>

          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-md transition-all"
          >
            {saving ? "Saving..." : "Save Settings"}
          </motion.button>
        </form>
      </motion.div>
    </Layout>
  )
}

export default Settings
