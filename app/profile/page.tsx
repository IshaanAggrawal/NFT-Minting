'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const [linkedWallets, setLinkedWallets] = useState<any[]>([])

  useEffect(() => {
    if (user && isLoaded) {
      const ethereumAccounts = user.externalAccounts?.filter(
        (account: any) => account.provider === 'ethereum'
      ) || []
      setLinkedWallets(ethereumAccounts)
    }
  }, [user, isLoaded])

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-white">Please sign in to view your profile.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Name</p>
                <p>{user.fullName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p>{user.primaryEmailAddress?.emailAddress || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Connected Wallets</h2>
            
            {linkedWallets.length > 0 ? (
              <div className="space-y-4">
                {linkedWallets.map((wallet: any) => (
                  <div key={wallet.externalId} className="flex items-center justify-between bg-gray-700 p-4 rounded">
                    <div>
                      <p className="font-mono">{wallet.externalId}</p>
                      <p className="text-sm text-gray-400">Connected</p>
                    </div>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Linked
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">
                <p>No wallets linked to your account yet.</p>
              </div>
            )}

            {linkedWallets.length === 0 && (
              <div className="mt-6 p-4 bg-blue-900/30 rounded">
                <p className="mb-2">Connect a wallet to link it to your account.</p>
                <p className="text-sm text-gray-400">Use the wallet connection button in the header to sign in with MetaMask or other web3 providers.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
