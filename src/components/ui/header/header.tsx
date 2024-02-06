import { ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react'
import LeftSection from './left_section'
import RightSection from './right_section'
import appTheme from '../../../../theme/theme'
import { Providers } from '@/app/providers'

export default function Header() {
  return (
    <>
        <Providers>
          <Flex justify="center" borderBottom="2px solid rgba(255, 255, 255, 0.2)">
            <Flex direction="row" justify="space-between" padding="12px 64px 12px 64px" width={"100%"} maxWidth={1920} minWidth={1360}>
              <LeftSection />
              <RightSection />
            </Flex>
          </Flex>
        </Providers>
    </>
  )
} 
