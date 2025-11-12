"use client";

import { useState, useEffect } from "react";
import Walletconnectbtn from "@/ui/Walletconnectbtn";
import LiquidEther from '@/components/LiquidEther';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            NFTMarket
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/market" className="hover:text-purple-400 transition-colors">Marketplace</a>
            <a href="/market" className="hover:text-purple-400 transition-colors">Collections</a>
            <a href="/mint" className="hover:text-purple-400 transition-colors">Create</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Activity</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Walletconnectbtn />
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover, Collect & Sell <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Digital Art</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            The world's largest NFT marketplace. Buy, sell, and discover rare digital assets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
              Explore Marketplace
            </button>
            <a href="/mint" className="bg-transparent border-2 border-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-500 transition-colors">
              Create NFT
            </a>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800">
              <div className="text-3xl font-bold text-purple-400">120K+</div>
              <div className="text-gray-400">Artworks</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800">
              <div className="text-3xl font-bold text-purple-400">85K+</div>
              <div className="text-gray-400">Creators</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800">
              <div className="text-3xl font-bold text-purple-400">250K+</div>
              <div className="text-gray-400">Collections</div>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800">
              <div className="text-3xl font-bold text-purple-400">50M+</div>
              <div className="text-gray-400">Volume</div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold mb-16 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Connect Wallet</h3>
              <p className="text-gray-400">
                Connect your wallet to start buying, selling, and creating NFTs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Upload & Mint</h3>
              <p className="text-gray-400">
                Upload your digital art and mint it as an NFT with our simple tool.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">List & Sell</h3>
              <p className="text-gray-400">
                List your NFTs for sale and start earning from your creations.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-800">
            <h2 className="text-3xl font-bold mb-4">Ready to start your NFT journey?</h2>
            <p className="text-gray-300 mb-8">
              Join thousands of creators and collectors in the world's largest NFT marketplace.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/mint" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all">
                Create NFT
              </a>
              <a href="/market" className="bg-transparent border-2 border-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-500 transition-colors">
                Explore Marketplace
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                  NFTMarket
                </div>
                <p className="text-gray-400">
                  The world's largest NFT marketplace for digital art and collectibles.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Marketplace</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">All NFTs</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Art</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Music</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Photography</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Platform Status</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
              <p>© 2025 NFTMarket. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}