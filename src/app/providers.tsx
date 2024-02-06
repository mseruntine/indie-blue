// app/providers.tsx
"use client"

//import { ChakraProvider, CacheProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import appTheme from '../../theme/theme'
import { ProvideCurrentGame } from '@/hooks/useCurrentGame'

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={appTheme}>
          <ProvideCurrentGame>
            {children}
          </ProvideCurrentGame>
      </ChakraProvider>
    </CacheProvider>
  )
}