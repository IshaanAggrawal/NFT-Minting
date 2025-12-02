import { currentUser } from '@clerk/nextjs/server'
import { useUser } from '@clerk/nextjs'
import { useAccount } from 'wagmi'
import { ExternalAccountResource } from '@clerk/types'

// Server-side function to get current user with wallet info
export async function getCurrentUserWithWallet() {
  const user = await currentUser()
  
  if (!user) {
    return null
  }
  
  // Extract wallet address from external accounts
  const walletAddress = user.externalAccounts?.find(
    (account: any) => account.provider === 'ethereum'
  )?.externalId || null
  
  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress || null,
    username: user.username || null,
    firstName: user.firstName || null,
    lastName: user.lastName || null,
    imageUrl: user.imageUrl || null,
    walletAddress,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

// Client-side hook to get user with wallet connection status
export function useUserWithWallet() {
  const { user, isLoaded } = useUser()
  const { address, isConnected, isConnecting } = useAccount()
  
  if (!isLoaded) {
    return { user: null, isLoaded: false, wallet: null }
  }
  
  if (!user) {
    return { user: null, isLoaded: true, wallet: null }
  }
  
  // Extract wallet address from external accounts
  const walletAddress = (user.externalAccounts?.find(
    (account: any) => account.provider === 'ethereum'
  ) as any)?.externalId || address || null
  
  return {
    isLoaded: true,
    user: {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || null,
      username: user.username || null,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      imageUrl: user.imageUrl || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    wallet: {
      address: walletAddress,
      isConnected: isConnected || !!walletAddress,
      isConnecting,
    }
  }
}

// Function to link wallet to Clerk user
export async function linkWalletToUser(walletAddress: string) {
  try {
    // In a real implementation, you would:
    // 1. Verify the wallet signature
    // 2. Link the wallet to the Clerk user account
    // 3. Update the user's external accounts
    
    // This is a placeholder implementation
    const response = await fetch('/api/link-wallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ walletAddress }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to link wallet')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error linking wallet:', error)
    throw error
  }
}