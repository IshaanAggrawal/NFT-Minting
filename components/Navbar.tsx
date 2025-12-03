"use client";

import Walletconnectbtn from "@/ui/Walletconnectbtn";
import UserMenuButton from "@/ui/UserMenuButton";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-white/5 backdrop-blur-3xl border-b border-white/20 shadow-2xl">
      <div className="text-2xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        NFTMarket
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
        <a href="/market" className="hover:text-purple-400 transition-colors">Marketplace</a>
        <a href="/mint" className="hover:text-purple-400 transition-colors">Create</a>
        <a href="/activity" className="hover:text-purple-400 transition-colors">Activity</a>
      </nav>
      <div className="flex items-center space-x-4">
        <Walletconnectbtn />
        <UserMenuButton />
      </div>
    </header>
  );
}
