"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function MintPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState("new");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [properties, setProperties] = useState<Array<{ trait_type: string; value: string }>>([]);
  const [royalties, setRoyalties] = useState(5);
  const [supply, setSupply] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [activeTab, setActiveTab] = useState("file");
  const [hasWallet, setHasWallet] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, isLoaded } = useUser();

  // Check if user has a connected wallet
  useEffect(() => {
    if (isLoaded && user) {
      let walletFound = false;

      // Check web3 wallets
      if (user.web3Wallets && user.web3Wallets.length > 0) {
        walletFound = true;
      }

      // Check external accounts for wallet
      if (!walletFound && user.externalAccounts) {
        walletFound = user.externalAccounts.some((account: any) => 
          account.provider === 'ethereum' || account.provider === 'web3' || account.provider?.toLowerCase().includes('wallet')
        );
      }

      // Check localStorage
      if (!walletFound && typeof window !== 'undefined') {
        const storedAddress = localStorage.getItem('walletAddress');
        if (storedAddress && storedAddress.length > 10) {
          walletFound = true;
        }
      }

      // Check window.ethereum
      if (!walletFound && typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          const account = (window as any).ethereum.selectedAddress;
          if (account && account.length > 0) {
            walletFound = true;
          }
        } catch (err) {
          console.log('Wallet check error:', err);
        }
      }

      setHasWallet(walletFound);
    }
  }, [isLoaded, user]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Add property
  const addProperty = () => {
    setProperties([...properties, { trait_type: "", value: "" }]);
  };

  // Update property
  const updateProperty = (index: number, field: "trait_type" | "value", value: string) => {
    const newProperties = [...properties];
    newProperties[index][field] = value;
    setProperties(newProperties);
  };

  // Remove property
  const removeProperty = (index: number) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!hasWallet) {
      setUploadStatus("❌ Please connect your wallet first");
      return;
    }

    if (!file) {
      setUploadStatus("Please select a file first");
      return;
    }

    if (!name.trim()) {
      setUploadStatus("Please enter a name for your NFT");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Uploading file to IPFS...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Upload failed");
      }

      const result = await response.json();
      setUploadStatus(`✅ File uploaded successfully! IPFS: ${result.cid}`);
      
      // Here you would typically call your smart contract to mint the NFT
      // For now, we'll just simulate the process
      setTimeout(() => {
        setUploadStatus("✅ NFT minted successfully!");
        setIsUploading(false);
      }, 2000);
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadStatus(`❌ Upload failed: ${error.message}`);
      setIsUploading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setName("");
    setDescription("");
    setCollection("new");
    setNewCollectionName("");
    setProperties([]);
    setRoyalties(5);
    setSupply(1);
    setUploadStatus("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-30">
        <SignedOut>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Sign in to Create NFTs</h2>
            <SignInButton mode="modal">
              <button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Create New NFT</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Upload your digital artwork, set your preferences, and mint your NFT on the blockchain
            </p>
          </div>

          {!hasWallet ? (
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 text-center">
              <h2 className="text-2xl font-bold mb-4">🔗 Connect Your Wallet</h2>
              <p className="text-gray-400 mb-6">
                You need to connect a Web3 wallet (MetaMask, etc.) to mint NFTs. 
                <br />
                <span className="text-sm text-gray-500 mt-2">You're signed in but no wallet detected.</span>
              </p>
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105"
              >
                Install MetaMask
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Panel - Preview */}
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                  <h2 className="text-xl font-bold mb-6">Preview</h2>
                  
                  <div className="aspect-square bg-gray-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-gray-500">Preview will appear here</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg">{name || "Your NFT Name"}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {description || "Your NFT description will appear here"}
                      </p>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <div className="text-gray-500">Collection</div>
                        <div>{collection === "new" ? newCollectionName || "New Collection" : "Selected Collection"}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Royalties</div>
                        <div>{royalties}%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Panel - Form */}
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                  <div className="flex border-b border-gray-800 mb-6">
                    <button
                      className={`py-3 px-4 font-medium ${activeTab === "file" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-500"}`}
                      onClick={() => setActiveTab("file")}
                    >
                      File
                    </button>
                    <button
                      className={`py-3 px-4 font-medium ${activeTab === "info" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-500"}`}
                      onClick={() => setActiveTab("info")}
                    >
                      Info
                    </button>
                    <button
                      className={`py-3 px-4 font-medium ${activeTab === "properties" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-500"}`}
                      onClick={() => setActiveTab("properties")}
                    >
                      Properties
                    </button>
                  </div>
                  
                  {activeTab === "file" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Upload File</label>
                        <div 
                          className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*,video/*,audio/*"
                          />
                          <div className="flex flex-col items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-gray-400 mb-1">Drag & drop files or click to browse</p>
                            <p className="text-gray-500 text-sm">PNG, JPG, GIF, MP4, MP3 up to 100MB</p>
                          </div>
                        </div>
                        {file && (
                          <div className="mt-3 text-sm text-gray-400">
                            Selected: {file.name}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Supply</label>
                        <div className="flex items-center">
                          <button 
                            className="w-10 h-10 rounded-l-lg bg-gray-800 flex items-center justify-center"
                            onClick={() => setSupply(Math.max(1, supply - 1))}
                          >
                            -
                          </button>
                          <div className="w-16 h-10 flex items-center justify-center bg-gray-900">
                            {supply}
                          </div>
                          <button 
                            className="w-10 h-10 rounded-r-lg bg-gray-800 flex items-center justify-center"
                            onClick={() => setSupply(supply + 1)}
                          >
                            +
                          </button>
                          <span className="ml-4 text-sm text-gray-400">Number of copies</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "info" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name *</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Item name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Describe your item"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Collection</label>
                        <select
                          value={collection}
                          onChange={(e) => setCollection(e.target.value)}
                          className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="new">Create New Collection</option>
                          <option value="art">Art Collection</option>
                          <option value="music">Music Collection</option>
                          <option value="photography">Photography Collection</option>
                        </select>
                      </div>
                      
                      {collection === "new" && (
                        <div>
                          <label className="block text-sm font-medium mb-2">New Collection Name</label>
                          <input
                            type="text"
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Collection name"
                          />
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Royalties: {royalties}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={royalties}
                          onChange={(e) => setRoyalties(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>10%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Set royalties to earn a percentage of sales each time your NFT is sold
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "properties" && (
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">Properties</h3>
                          <button
                            onClick={addProperty}
                            className="text-purple-400 hover:text-purple-300 text-sm"
                          >
                            + Add Property
                          </button>
                        </div>
                        
                        {properties.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p>No properties added yet</p>
                            <p className="text-sm mt-2">Add properties to highlight unique features of your NFT</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {properties.map((prop, index) => (
                              <div key={index} className="flex gap-2">
                                <input
                                  type="text"
                                  value={prop.trait_type}
                                  onChange={(e) => updateProperty(index, "trait_type", e.target.value)}
                                  className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                  placeholder="Type"
                                />
                                <input
                                  type="text"
                                  value={prop.value}
                                  onChange={(e) => updateProperty(index, "value", e.target.value)}
                                  className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                  placeholder="Value"
                                />
                                <button
                                  onClick={() => removeProperty(index)}
                                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-red-500"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8">
                    {uploadStatus && (
                      <div className={`p-3 rounded-lg mb-4 text-sm ${
                        uploadStatus.includes("failed") ? "bg-red-900/30 text-red-400" : 
                        uploadStatus.includes("successfully") ? "bg-green-900/30 text-green-400" : 
                        "bg-blue-900/30 text-blue-400"
                      }`}>
                        {uploadStatus}
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="flex-1 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
                      >
                        {isUploading ? "Minting..." : "Create NFT"}
                      </button>
                      <button
                        onClick={resetForm}
                        className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
