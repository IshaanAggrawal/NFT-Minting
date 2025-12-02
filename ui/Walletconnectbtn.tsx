'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function WalletConnectButton() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  // Get wallet address from various sources
  useEffect(() => {
    if (isLoaded && user) {
      let foundAddress: string | null = null

      // 1. Try to get web3 wallet from Clerk
      const web3Wallets = user.web3Wallets
      if (web3Wallets && web3Wallets.length > 0) {
        foundAddress = web3Wallets[0].web3Wallet
      }

      // 2. Try to get from external accounts
      if (!foundAddress) {
        const externalAccounts = user.externalAccounts
        if (externalAccounts && externalAccounts.length > 0) {
          const walletAccount = externalAccounts.find((account: any) => 
            account.provider === 'ethereum' || account.provider === 'web3' || account.provider?.toLowerCase().includes('wallet')
          )
          if (walletAccount) {
            // Use identificationId or any available identifier
            foundAddress = (walletAccount as any).identificationId || (walletAccount as any).identification || (walletAccount as any).externalId
          }
        }
      }

      // 3. Try to get from localStorage (MetaMask connection)
      if (!foundAddress && typeof window !== 'undefined') {
        const storedAddress = localStorage.getItem('walletAddress')
        if (storedAddress) {
          foundAddress = storedAddress
        }
      }

      // 4. Try to get from window.ethereum (if MetaMask is connected)
      if (!foundAddress && typeof window !== 'undefined' && (window as any).ethereum) {
        const accounts = (window as any).ethereum.selectedAddress
        if (accounts) {
          foundAddress = accounts
          localStorage.setItem('walletAddress', accounts)
        }
      }

      // 5. Fallback to email if no wallet found
      if (!foundAddress && user.emailAddresses && user.emailAddresses.length > 0) {
        const email = user.emailAddresses[0].emailAddress
        foundAddress = `${email.split('@')[0].slice(0, 6)}...`
      }

      if (foundAddress) {
        setWalletAddress(foundAddress)
      }
    }
  }, [isLoaded, user])

  if (!isLoaded) {
    return (
      <button 
        disabled
        className="bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-6 rounded-full transition-all"
      >
        Loading...
      </button>
    )
  }

  if (!user) {
    return (
      <button 
        onClick={() => router.push('/sign-up')}
        className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105"
      >
        Sign In
      </button>
    )
  }

  if (walletAddress) {
    return (
      <button 
        className="bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-6 rounded-full transition-all"
      >
        Connected
      </button>
    )
  }
  
  return (
    <button 
      className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105"
    >
      Connect Wallet
    </button>
  )
}