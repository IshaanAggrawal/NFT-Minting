'use client'

import { UserButton } from '@clerk/nextjs'

export default function UserMenuButton() {
  return (
    <UserButton 
      appearance={{
        elements: {
          userButtonAvatarBox: "w-10 h-10",
        },
      }}
      afterSignOutUrl="/"
    />
  )
}
