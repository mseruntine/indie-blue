"use client"

import { Box, Button, Divider, Flex, Heading, Image, Link, Select, Input, Text } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useState } from 'react';
import { collection, doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isDeveloper, setIsDeveloper] = useState("");
  const userDBName = "userbase";
  const usersTableRef = collection(db, userDBName);

  const addUserToDB = async (user: any) => {

    let isDeveloperBool:boolean;

    if (isDeveloper === "true") {
      isDeveloperBool = true;
    } else {
      isDeveloperBool = false
    }

    await setDoc(doc(usersTableRef, user.uid), {
      username: username,
      developer: isDeveloperBool,
      subscription_tier: 0,
      description: "",
      bluesletters: [],
      awards: [],
      games: [],
      bluesletters_preferences: ["", "", ""]
    });
  }

  const onSignup = async (e: { preventDefault: () => void; }) => {

    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      // console.log(user);
      await addUserToDB(user);
      localStorage.setItem('currentUser', user.uid);
      window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

  }

  return (
    <Box>
    <Flex paddingTop={"6%"} alignItems="center" justifyContent="center">
     <Flex direction="column" rounded={5}> 
       <Flex alignItems="center" justifyContent="center">
        <Image mb={6} src="/images/IBLogo.svg" alt="IndieBlue Logo" width="200px" height="200px" />
       </Flex>
       <Heading mb={6}>Sign Up for IndieBlue!</Heading>
       <Input 
            placeholder="Email" 
            background={"rgba(255,255,255,0.2)"} 
            variant="filled" 
            mb={6} 
            type="email"
            onChange={(e) => setEmail(e.target.value)} 
          />
       <Input 
            placeholder="Username" 
            background={"rgba(255,255,255,0.2)"} 
            variant="filled" 
            mb={6} 
            type="username" 
            onChange={(e) => setUsername(e.target.value)} 
          />
       <Input 
            placeholder="Password" 
            background={"rgba(255,255,255,0.2)"} 
            variant="filled" 
            mb={6} 
            type="password"
            onChange={(e) => setPassword(e.target.value)}   
          />
       <Input 
            placeholder="Confirm Password" 
            background={"rgba(255,255,255,0.2)"} 
            variant="filled" 
            mb={6} 
            type="password" />
       <Flex flexDirection="column" gap="5px">
        <Text>Are you a developer?</Text>
        <Select onChange={(e) => setIsDeveloper(e.target.value)}>
          <option style={{background: "#2D3748"}} value='false'>No</option>
          <option style={{background: "#2D3748"}} value='true'>Yes</option>
        </Select>
       </Flex>

     </Flex>
   </Flex>

   <Flex paddingTop={"35px"} alignItems="center" justifyContent="center">
      <Button width="160px" colorScheme="red" alignItems="center" justifyContent="center" onClick={onSignup}>Sign Up</Button>
    </Flex>

   <Flex padding={"35px 0px"} alignItems="center" justifyContent="center">
    <Divider alignItems="center" justifyContent="center" size="x20"></Divider>
      <Heading width="900px" as="h2" display={"flex"} fontWeight={"400"} fontSize={"1xl"} justifyContent={"center"}>Already have an account?{' '}
        <Link mx="7px" href="/signin">Sign In</Link>
      </Heading>
    <Divider alignItems="center" justifyContent="center"></Divider>
   </Flex>
   
   </Box>
   )
 }
