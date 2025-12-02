"use client";

import { useState } from "react";
import Walletconnectbtn from "@/ui/Walletconnectbtn";
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function ActivityPage() {
  const [filter, setFilter] = useState("all");
  const { isLoaded } = useUser();

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "sale",
      nft: "Abstract Art #123",
      price: "0.5 ETH",
      from: "0x1234...5678",
      to: "0x8765...4321",
      time: "2 hours ago",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      type: "bid",
      nft: "Digital Monkey #456",
      price: "1.2 ETH",
      from: "0x5678...9012",
      to: "0x1234...5678",
      time: "5 hours ago",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      type: "listing",
      nft: "Cyber Punk #789",
      price: "2.5 ETH",
      from: "0x9012...3456",
      to: "0x5678...9012",
      time: "1 day ago",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      type: "transfer",
      nft: "Neon Dreams #012",
      price: "-",
      from: "0x3456...7890",
      to: "0x9012...3456",
      time: "2 days ago",
      image: "/placeholder.svg"
    }
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
              <Walletconnectbtn />
            </SignedIn>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Activity Feed</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Track all the latest transactions, bids, and listings happening on NFTMarket
            </p>
          </div>

          <SignedOut>
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
              <p className="text-gray-400 mb-6">
                You need to sign in to view your activity feed and transaction history
              </p>
              <SignInButton mode="modal">
                <button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="space-y-8">
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-8">
                  <button 
                    className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full ${filter === 'sales' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={() => setFilter('sales')}
                  >
                    Sales
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full ${filter === 'listings' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={() => setFilter('listings')}
                  >
                    Listings
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full ${filter === 'bids' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={() => setFilter('bids')}
                  >
                    Bids
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full ${filter === 'transfers' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={() => setFilter('transfers')}
                  >
                    Transfers
                  </button>
                </div>

                {/* Activity List */}
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-purple-500 transition-all">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-lg bg-linear-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center mr-4">
                          <div className="text-xl font-bold text-purple-400/20">NFT</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-bold">{activity.nft}</h3>
                            <span className="text-gray-400 text-sm">{activity.time}</span>
                          </div>
                          <div className="flex items-center mt-2 text-sm">
                            <span className={`px-2 py-1 rounded mr-3 ${
                              activity.type === 'sale' ? 'bg-green-900/30 text-green-400' :
                              activity.type === 'bid' ? 'bg-yellow-900/30 text-yellow-400' :
                              activity.type === 'listing' ? 'bg-blue-900/30 text-blue-400' :
                              'bg-purple-900/30 text-purple-400'
                            }`}>
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </span>
                            <span className="text-gray-400 mr-2">From:</span>
                            <span className="font-mono">{activity.from}</span>
                            <span className="mx-2 text-gray-600">→</span>
                            <span className="text-gray-400 mr-2">To:</span>
                            <span className="font-mono">{activity.to}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{activity.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

