"use client"

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

export default function Landing() {

  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [buttonLoading1, setButtonLoading1] = useState(false);
  const [buttonLoading2, setButtonLoading2] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('currentUser') !== null && localStorage.getItem('currentUser') !== "") {
      setLoggedIn(true);
      setLoading(false);
    }
    else {
      setLoading(false);
    }

  }, []);

  return (
    
    <>
    {loading === false ? 
      (loggedIn === false ?
        <Box marginTop={"6rem"}>
          <Heading as="h1" display={"flex"} fontWeight={"black"} fontSize={"5xl"} justifyContent={"center"}>Indie games. For everyone.</Heading>
          <Text display={"flex"} fontSize={"lg"} justifyContent={"center"} textAlign={"center"} padding={"20px"}>Find the games you never knew you needed. We deliver creations from passionate developers directly to your inbox.</Text>
          <Flex justifyContent={"center"} gap={"20px"} paddingTop={"40px"}>
            <Button isLoading={buttonLoading1} onClick={() => {
              setButtonLoading1(true);
              router.push("/signup");
            }}>Get Your Bluesletter</Button>
            <Button isLoading={buttonLoading2} variant={"purple"} onClick={() => {
              setButtonLoading2(true);
              router.push("/explore");
            }}>Explore Games</Button>
          </Flex>
        </Box> :
        <Box marginTop={"6rem"}>
          <Heading as="h1" display={"flex"} fontWeight={"black"} fontSize={"5xl"} justifyContent={"center"}>Welcome back to IndieBlue.</Heading>
          <Text display={"flex"} fontSize={"lg"} justifyContent={"center"} textAlign={"center"} padding={"20px"}>Let&apos;s find some fun games for you!</Text>
          <Flex justifyContent={"center"} gap={"20px"} paddingTop={"40px"}>
            <Button isLoading={buttonLoading1} onClick={() => {
              setButtonLoading1(true);
              router.push("/bluesletter");
            }}>View Your Bluesletter</Button>
            <Button isLoading={buttonLoading2} variant={"purple"} onClick={() => {
              setButtonLoading2(true);
              router.push("/explore");
            }}>Explore Games</Button>
          </Flex>
        </Box> ) : null }
    </>
  )
}
