"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import LiquidEther from '@/components/LiquidEther';
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white">
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
        <Navbar />

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 pt-40 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover, Collect & Sell <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Digital Art</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            The world's largest NFT marketplace. Buy, sell, and discover rare digital assets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/market" 
              className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
            >
              Explore Marketplace
            </a>
            {user ? (
              <a 
                href="/mint" 
                className="bg-transparent border-2 border-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-500 transition-colors"
              >
                Create NFT
              </a>
            ) : (
              <button 
                onClick={() => alert("Please sign in to create NFTs")}
                className="bg-transparent border-2 border-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-500 transition-colors"
              >
                Sign In to Create
              </button>
            )}
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started with NFTMarket in just a few simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center">Connect Wallet</h3>
              <p className="text-gray-400 text-center">
                Connect your crypto wallet to start buying, selling, and creating NFTs. We support all major wallets.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center">Upload & Mint</h3>
              <p className="text-gray-400 text-center">
                Upload your digital art and mint it as an NFT with our simple tool. Set your royalties and pricing.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center">List & Sell</h3>
              <p className="text-gray-400 text-center">
                List your NFTs for sale and start earning from your creations. Set fixed prices or auction formats.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto bg-linear-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-800">
            <h2 className="text-3xl font-bold mb-4">Ready to start your NFT journey?</h2>
            <p className="text-gray-300 mb-8">
              Join thousands of creators and collectors in the world's largest NFT marketplace.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/mint" 
                className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all"
              >
                Create NFT
              </a>
              <a 
                href="/market" 
                className="bg-transparent border-2 border-purple-500 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-500 transition-colors"
              >
                Explore Marketplace
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
