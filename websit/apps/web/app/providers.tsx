import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import { TRPCReactProvider } from 'trpc/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <TRPCReactProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </TRPCReactProvider>
    </NextUIProvider>
  )
}