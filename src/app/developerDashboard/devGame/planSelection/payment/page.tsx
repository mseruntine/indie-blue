"use client"

import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Divider,
  Text,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { useCurrentGame } from '@/hooks/useCurrentGame';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase';
import { doc, collection, getDoc } from 'firebase/firestore';

function PaymentPage() {
  const selectedGame = useCurrentGame();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    userid: "",
    username: "",
    picture: "",
    developer: false
  });

  useEffect(() => {
    const getUserData = async (uid: string) => {

      var docRef = doc(collection(db, "userbase"), uid);
      var userData = await getDoc(docRef);

      console.log("User data: " + userData.data());

      currentUser.userid = uid;
      currentUser.username = userData.data()?.username;
      currentUser.picture = userData.data()?.profile_image;
      currentUser.developer = userData.data()?.developer;

      setLoading(false);
    };

    if (localStorage.getItem('currentUser') !== null && localStorage.getItem('currentUser') !== "") {
      getUserData(localStorage.getItem('currentUser')!);
    } else {
      router.push("/signin");
    }
  }, [currentUser, router]);

  return (
    <>
      {loading === false ? <>
        <Flex >
          <Flex paddingTop={"25px"}>
            <IconButton as={IoMdArrowRoundBack} aria-label="Back button" height={"50px"} width={"50px"} mt="20px" variant="unstyled"
              transition={"all 0.2s ease-in-out"} _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
              onClick={() => {
                selectedGame.currentGame.paymentPlanName = "Unselected Plan";
                router.push("/developerDashboard/devGame/planSelection");
              }} />
          </Flex>
          <Box maxW="2xl" mx="8" mt="8" mb="12" p="6" borderWidth="2px" borderRadius="lg" boxShadow="lg">
            <Heading as="h2" size="xl" mb="6">
              Payment Details for <br></br> {selectedGame.currentGame.gameName}
            </Heading>
            <Stack spacing="4" direction="row" align="flex-start">
              {/* Payment Information */}
              <Box flex="2">
                <form action="/process-payment" method="post">
                  <FormControl id="name-on-card" isRequired marginBottom={"10px"}>
                    <FormLabel>Name on Card</FormLabel>
                    <Input background={"rgba(255,255,255,0.2)"} variant={"filled"} type="text" />
                  </FormControl>

                  <FormControl id="card-number" isRequired marginBottom={"10px"}>
                    <FormLabel>Card Number</FormLabel>
                    <Input background={"rgba(255,255,255,0.2)"} variant={"filled"} type="text" />
                  </FormControl>

                  <Stack spacing="4" direction="row">
                    <FormControl id="expiry-date" isRequired marginBottom={"10px"}>
                      <FormLabel>Exp. Date</FormLabel>
                      <Input background={"rgba(255,255,255,0.2)"} variant={"filled"} type="text" placeholder="MM/YY" />
                    </FormControl>

                    <FormControl id="security-code" isRequired marginBottom={"10px"}>
                      <FormLabel>Security Code</FormLabel>
                      <Input background={"rgba(255,255,255,0.2)"} variant={"filled"} type="password" />
                    </FormControl>
                  </Stack>

                  {/* Contact Information */}
                  <Divider mt="6" mb="6" />

                  <Heading as="h3" size="md" mb="4">
                    Contact Information
                  </Heading>

                  <FormControl id="email" isRequired marginBottom={"10px"}>
                    <FormLabel>Email</FormLabel>
                    <Input background={"rgba(255,255,255,0.2)"} variant={"filled"} type="email" />
                  </FormControl>

                  <FormControl id="phone" isRequired marginBottom={"10px"}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input background={"rgba(255,255,255,0.2)"} variant={"filled"} type="tel" />
                  </FormControl>

                  <Button isLoading={buttonLoading} onClick={() => {
                    setButtonLoading(true);
                    console.log("Payment Successful");
                    router.push("/developerDashboard/devGame");
                  }} variant="purple" size="lg" mt="6">
                    Pay Now
                  </Button>
                </form>
              </Box>

              {/* Plan Summary */}
              <Box flex="2" ml="6">
                <Heading as="h3" size="md" mb="4">
                  Plan Summary
                </Heading>
                <Flex direction="column" borderWidth="1px" borderRadius="lg" p="4">
                  <Text fontWeight="bold">Selected Plan:</Text>
                  <Text>{selectedGame.currentGame.paymentPlanName}</Text>
                  <Divider mt="3" mb="3" />
                  <Text fontWeight="bold">Price:</Text>
                  <Text>{selectedGame.currentGame.paymentPlanPrice}/month</Text>
                </Flex>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </> : null}
    </>
  );
}

export default PaymentPage;
