import { clerkClient } from '@clerk/nextjs/server'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { walletAddress } = await request.json()
    
    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }
    
    // Get clerk client instance
    const clerk = await clerkClient()
    
    // Store wallet address in user metadata
    const currentMetadata = user.publicMetadata as any || {}
    const linkedWallets = currentMetadata.linkedWallets || []
    
    // Check if wallet is already linked to this user
    if (linkedWallets.includes(walletAddress)) {
      return NextResponse.json(
        { error: 'Wallet already linked to this account' },
        { status: 409 }
      )
    }
    
    // Add wallet to metadata
    linkedWallets.push(walletAddress)
    
    // Update user metadata
    await clerk.users.updateUser(user.id, {
      publicMetadata: {
        ...currentMetadata,
        linkedWallets: linkedWallets
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Wallet linked successfully' 
    })
  } catch (error) {
    console.error('Error linking wallet:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}