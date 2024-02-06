"use client"

import Plan from '@/components/ui/planSelection/plan';
import { db } from '@/firebase';
import { useCurrentGame } from '@/hooks/useCurrentGame';
import { Flex, Grid, GridItem, IconButton, Text } from '@chakra-ui/react'
import { doc, collection, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io'


export default function PlanSelection() {

  const selectedGame = useCurrentGame();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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
        <Grid
          templateColumns={"repeat(3, 1fr)"}
          padding={"50px 0px"}>
          <GridItem>
            <Flex direction="row" justifyContent={"left"}>
              <IconButton as={IoMdArrowRoundBack} aria-label="Back button" height={"50px"} width={"50px"} variant="unstyled"
                transition={"all 0.2s ease-in-out"} _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
                onClick={() => {
                  router.push("/developerDashboard/devGame");
                }} />
            </Flex>
          </GridItem>
          <GridItem>
            <Text fontSize="32px" fontWeight="600" color="white" textAlign={"center"}>
              Choose your Subscription Plan for <b>{selectedGame.currentGame.gameName}</b>
            </Text>
          </GridItem>
        </Grid><Flex flexWrap={"wrap"} justifyContent={"center"} gap={"80px"} paddingBottom={"50px"} maxW={"1430px"}>
          <Plan title="Standard Plan" price="$2.99" blueslettersperMonth="100" color="primary.700" />
          <Plan title="Pro Plan" price="$4.99" blueslettersperMonth="250" color="tertiary.500" mostPopular mostPopularColor='tertiary.400' />
          <Plan title="Deluxe Plan" price="$9.99" blueslettersperMonth="1000" color="secondary.500" />
          <Plan title="Basic Plan" price="$0.75" color="rgba(255, 255, 255, 0.30)" />
        </Flex><Text fontWeight={"300"} fontSize="16px" padding="40px 0px 80px 0px">For marketing inquires, contact us at sales@indieblue.com</Text>
      </> : null}
    </>
  )
}