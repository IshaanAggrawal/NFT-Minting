'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function WalletConnectButton() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isCheckingWallet, setIsCheckingWallet] = useState(true)

  // Get wallet address from various sources
  useEffect(() => {
    const checkWallet = async () => {
      setIsCheckingWallet(true)
      
      if (!isLoaded || !user) {
        setWalletAddress(null)
        setIsCheckingWallet(false)
        return
      }

      let foundAddress: string | null = null

      // 1. Try to get web3 wallet from Clerk
      const web3Wallets = user.web3Wallets
      if (web3Wallets && web3Wallets.length > 0) {
        foundAddress = web3Wallets[0].web3Wallet
      }

      // 2. Try to get from external accounts (wallet provider)
      if (!foundAddress) {
        const externalAccounts = user.externalAccounts
        if (externalAccounts && externalAccounts.length > 0) {
          const walletAccount = externalAccounts.find((account: any) => 
            account.provider === 'ethereum' || account.provider === 'web3' || account.provider?.toLowerCase().includes('wallet')
          )
          if (walletAccount) {
            foundAddress = (walletAccount as any).identificationId || (walletAccount as any).identification || (walletAccount as any).externalId
          }
        }
      }

      // 3. Try to get from localStorage (MetaMask connection)
      if (!foundAddress && typeof window !== 'undefined') {
        const storedAddress = localStorage.getItem('walletAddress')
        if (storedAddress && storedAddress.length > 10) {
          foundAddress = storedAddress
        }
      }

      // 4. Try to get from window.ethereum (if MetaMask is connected)
      if (!foundAddress && typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          const accounts = (window as any).ethereum.selectedAddress
          if (accounts && accounts.length > 0) {
            foundAddress = accounts
            localStorage.setItem('walletAddress', accounts)
          }
        } catch (err) {
          console.log('Wallet check error:', err)
        }
      }

      // 5. Only fallback to email if user explicitly has ONLY google signin (no wallet)
      // Don't show email as "connected" for sensitive operations like minting
      if (!foundAddress) {
        // Check if user only has Google auth and no wallet
        const hasGoogleOnly = user.externalAccounts && 
                            user.externalAccounts.length > 0 &&
                            user.externalAccounts.every((account: any) => account.provider === 'google')
        if (hasGoogleOnly) {
          foundAddress = null // User is signed in but has no wallet
        }
      }

      setWalletAddress(foundAddress)
      setIsCheckingWallet(false)
    }

    checkWallet()
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

  // User is signed in but NO wallet connected
  if (!isCheckingWallet && !walletAddress) {
    return (
      <button 
        onClick={() => {
          // Prompt user to connect wallet via MetaMask or add wallet to account
          alert('Please connect your wallet to access minting features')
        }}
        className="bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105"
      >
        Connect Wallet
      </button>
    )
  }

  // User has wallet connected
  if (walletAddress) {
    return (
      <button 
        title={walletAddress}
        className="bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold py-2 px-6 rounded-full transition-all"
      >
        ✓ Connected
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