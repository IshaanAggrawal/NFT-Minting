'use client'

import { ClerkProvider as ClerkReactProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkReactProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#9D4EDD',
        },
      }}
    >
      {children}
    </ClerkReactProvider>
  )
}