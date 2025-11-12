"use client";

import { useState } from "react";
import Walletconnectbtn from "@/ui/Walletconnectbtn";

export default function MarketPage() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center py-6 mb-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            NFTMarket
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="/market" className="hover:text-purple-400 transition-colors">Marketplace</a>
            <a href="/mint" className="hover:text-purple-400 transition-colors">Create</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Activity</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Walletconnectbtn />
          </div>
        </header>

        {/* Market Content */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">NFT Marketplace</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover and collect unique digital assets from talented creators around the world
            </p>
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-4 py-2 rounded-full ${filter === 'art' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                onClick={() => setFilter('art')}
              >
                Art
              </button>
              <button 
                className={`px-4 py-2 rounded-full ${filter === 'music' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                onClick={() => setFilter('music')}
              >
                Music
              </button>
              <button 
                className={`px-4 py-2 rounded-full ${filter === 'photography' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                onClick={() => setFilter('photography')}
              >
                Photography
              </button>
            </div>
            
            <select 
              className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Featured Collections */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-10">Featured Collections</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all group">
                  <div className="h-60 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                    <div className="text-5xl font-bold text-purple-400/20">NFT</div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Collection #{item}</h3>
                        <p className="text-gray-400 text-sm">by Creator Name</p>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400 text-sm">Floor</div>
                        <div className="font-bold">0.{item * 5} ETH</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <div className="text-gray-400">Volume</div>
                        <div className="font-bold">{item * 12.5} ETH</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Items</div>
                        <div className="font-bold">{item * 1234}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trending NFTs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-10">Trending NFTs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all group">
                  <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                    <div className="text-3xl font-bold text-purple-400/20">NFT</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold truncate">Amazing Digital Art #{item}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-gray-400">0.{item} ETH</div>
                      <button className="text-xs bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Top Creators */}
          <section>
            <h2 className="text-3xl font-bold mb-10">Top Creators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-purple-500 transition-all text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">C{item}</span>
                  </div>
                  <h3 className="font-bold">Creator #{item}</h3>
                  <div className="text-purple-400 text-sm mt-1">0.{item * 5} ETH earned</div>
                  <button className="mt-4 w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}