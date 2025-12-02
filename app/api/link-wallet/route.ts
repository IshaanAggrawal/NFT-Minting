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
    
    // Check if wallet is already linked to another user
    const existingUsers = await clerkClient.users.getUserList({
      externalId: [`ethereum:${walletAddress}`]
    })
    
    if (existingUsers.data.length > 0 && existingUsers.data[0].id !== user.id) {
      return NextResponse.json(
        { error: 'Wallet already linked to another account' },
        { status: 409 }
      )
    }
    
    // Link wallet to user
    await clerkClient.users.updateUser(user.id, {
      externalAccounts: [
        ...(user.externalAccounts || []),
        {
          provider: 'ethereum',
          externalId: walletAddress,
          verified: true,
        }
      ]
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