'use client'

import { ClerkProvider as ClerkReactProvider } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  
  return (
    <ClerkReactProvider
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary: '#9D4EDD',
        },
      }}
    >
      {children}
    </ClerkReactProvider>
  )
}