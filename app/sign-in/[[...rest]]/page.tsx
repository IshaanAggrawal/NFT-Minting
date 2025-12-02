import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <SignIn 
        routing="hash"
        appearance={{
          variables: {
            colorPrimary: '#9D4EDD',
          },
        }}
      />
    </div>
  )
}
