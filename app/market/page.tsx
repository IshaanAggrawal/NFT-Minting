"use client";

import { useState } from "react";
import WalletConnectButton from "@/ui/Walletconnectbtn";
import { useUser } from "@clerk/nextjs";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function MarketPage() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const { user, isLoaded } = useUser();

  // Function to handle purchase action
  const handlePurchase = (itemId: number) => {
    if (!user) {
      alert("Please sign in to purchase NFTs");
      return;
    }
    // Purchase logic would go here
    alert(`Purchase initiated for NFT #${itemId}!`);
    setSelectedNFT(null); // Close the modal after purchase
  };

  // Mock NFT data
  const nfts = [
    { id: 1, name: "Cosmic Dreams #1", price: "0.5", creator: "CryptoArtist", likes: 24 },
    { id: 2, name: "Digital Waves #2", price: "1.2", creator: "NFTMaster", likes: 42 },
    { id: 3, name: "Neon Future #3", price: "0.8", creator: "PixelPro", likes: 18 },
    { id: 4, name: "Abstract Vision #4", price: "2.5", creator: "ArtGenius", likes: 67 },
    { id: 5, name: "Cyber Punk #5", price: "1.7", creator: "FutureCreator", likes: 35 },
    { id: 6, name: "Virtual Reality #6", price: "3.1", creator: "MetaArtist", likes: 89 },
    { id: 7, name: "Quantum Art #7", price: "0.9", creator: "PhysicsNFT", likes: 23 },
    { id: 8, name: "Holographic #8", price: "1.5", creator: "LightMaker", likes: 56 }
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center py-6 mb-8">
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
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <WalletConnectButton />
            </SignedIn>
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

          {/* Trending NFTs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-10">Trending NFTs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {nfts.map((nft) => (
                <div 
                  key={nft.id} 
                  className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all group cursor-pointer"
                  onClick={() => setSelectedNFT(nft.id)}
                >
                  <div className="aspect-square bg-linear-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                    <div className="text-3xl font-bold text-purple-400/20">NFT #{nft.id}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold truncate">{nft.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-gray-400">{nft.price} ETH</div>
                      <div className="flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {nft.likes}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NFT Detail Modal */}
          {selectedNFT !== null && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-linear-to-br from-gray-900 to-black border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold">NFT Details</h2>
                    <button 
                      onClick={() => setSelectedNFT(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-square bg-linear-to-br from-purple-900/30 to-pink-900/30 rounded-xl flex items-center justify-center">
                      <div className="text-5xl font-bold text-purple-400/20">NFT #{selectedNFT}</div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Amazing Digital Art #{selectedNFT}</h3>
                      <p className="text-gray-400 mb-6">Created by a talented digital artist using advanced generative techniques.</p>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Owner</span>
                          <span className="font-mono text-sm">0x1234...5678</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Collection</span>
                          <span>Genesis Collection</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Token ID</span>
                          <span>#{selectedNFT}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <div className="text-gray-400">Current Price</div>
                          <div className="text-2xl font-bold">{nfts.find(n => n.id === selectedNFT)?.price} ETH</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400">Highest Bid</div>
                          <div className="font-bold">0.{selectedNFT + 2} ETH</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        {user ? (
                          <>
                            <button
                              onClick={() => handlePurchase(selectedNFT)}
                              className="flex-1 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                            >
                              Buy Now
                            </button>
                            <button className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                              Make Offer
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => alert("Please sign in to purchase NFTs")}
                            className="flex-1 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                          >
                            Sign In to Buy
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

