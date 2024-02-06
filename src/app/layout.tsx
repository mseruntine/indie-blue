// app/layout.tsx
import { ColorModeScript, Container } from "@chakra-ui/react";
import { Providers } from "./providers";
import { Metadata } from "next";
import Header from "../components/ui/header/header";
import Footer from "@/components/ui/footer/footer";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'IndieBlue',
  description: 'Hosted independently.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Header />
          <Container width={"100%"} centerContent>
            <Container maxWidth={1920} minWidth={1360} minHeight={"90vh"} padding={"0px 120px"} centerContent>
              <ColorModeScript/>
              <Providers>
                {children}
              </Providers>
            </Container>
            <Footer />
          </Container>
      </body>
    </html>
  );
}