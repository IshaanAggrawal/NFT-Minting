import { currentUser } from '@clerk/nextjs/server'
import { useUser } from '@clerk/nextjs'

// Server-side function to get current user with wallet info
export async function getCurrentUserWithWallet() {
  const user = await currentUser()
  
  if (!user) {
    return null
  }
  
  // Extract wallet address from metadata or external accounts
  const linkedWallets = (user.publicMetadata as any)?.linkedWallets || []
  const walletAddress = linkedWallets[0] || null
  
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