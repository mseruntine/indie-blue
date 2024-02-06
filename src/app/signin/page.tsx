"use client"

import { Box, Button, Divider, Flex, Heading, Image, Link, Input } from '@chakra-ui/react'
import { signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase.js';
import React, { useState } from 'react';

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState('');

  const onLogin = (e: { preventDefault: () => void; }) => {
    setButtonLoading(true);
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signed In")
        localStorage.setItem('currentUser', user.uid);
        window.location.href = "/";

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        setError("Invalid Email or Password");
    });   
    
  }

  return (
    <Box>
      <Flex paddingTop={"12%"} alignItems="center" justifyContent="center">
        <Flex direction="column" rounded={5}>
          <Flex flexDirection={"column"} alignItems="center" justifyContent="center" gap={"25px"}>
            {error && <Heading color="red"  mt={2}>{error}</Heading>}
            <Image mb={6} src="/images/IBLogo.svg" alt="IndieBlue Logo" width="200px" height="200px" />
          </Flex>
          <Heading mb={6} size='3xl' textAlign={'center'} alignItems="center" justifyContent="center">Welcome to IndieBlue!</Heading>
          <Flex direction="column" alignItems="center" justifyContent="center">
            <Input width="69%" placeholder="Email Address" background={"rgba(255,255,255,0.2)"} variant="filled" mb={6} type="username" onChange={(e)=>setEmail(e.target.value)}/>
            <Input width="69%" placeholder="Password" background={"rgba(255,255,255,0.2)"} variant="filled" mb={2} type="password" onChange={(e)=>setPassword(e.target.value)}/>
            <Flex width="69%" direction="column" alignItems={"flex-end"}>
              <Link onClick={() => {
                console.log("Forgot Password");
              }}>Forgot Password?</Link>
            </Flex>
          </Flex>

        </Flex>
      </Flex>

      <Flex paddingTop={"15px"} alignItems="center" justifyContent="center">
        <Button isLoading={buttonLoading} width="160px" colorScheme="red" alignItems="center" justifyContent="center" onClick={onLogin}>Sign In</Button>
      </Flex>

      <Flex padding={"35px 0px"} alignItems="center" justifyContent="center">
        <Divider alignItems="center" justifyContent="center" size="x20"></Divider>
        <Heading width="900px" as="h2" display={"flex"} fontWeight={"400"} fontSize={"1xl"} justifyContent={"center"}>Don&apos;t have an account? {' '}
          <Link mx="7px" href="/signup">Sign Up</Link>
        </Heading>
        <Divider alignItems="center" justifyContent="center"></Divider>
      </Flex>

    </Box>
  )
}
