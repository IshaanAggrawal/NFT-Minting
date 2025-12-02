import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

import { headers } from 'next/headers' 
import Footer from '@/components/Footer'
import { ClerkProvider } from '@/components/ClerkProvider'

export const metadata: Metadata = {
  title: 'NFT Mining App',
  description: 'Powered by Reown'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  const headersObj = await headers();
  const cookies = headersObj.get('cookie')

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
            <div className="flex flex-col min-h-screen">
              <main className="grow">
                {children}
              </main>
              <Footer />
            </div>
        </body>
      </html>
    </ClerkProvider>
  )
}