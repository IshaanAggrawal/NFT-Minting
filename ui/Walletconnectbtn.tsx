'use client'

import '@reown/appkit/react'
import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'

export default function ConnectButton() {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()
  
  if (isConnected && address) {
    // Show abbreviated wallet address when connected
    const abbreviatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`
    return (
      <button 
        onClick={() => open()}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105"
      >
        {abbreviatedAddress}
      </button>
    )
  }
  
  return (
    <button 
      onClick={() => open()}
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105"
    >
      Connect Wallet
    </button>
  )
}