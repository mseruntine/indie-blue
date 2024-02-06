"use client"

import { Flex, Box, Text, Grid, GridItem, Button } from '@chakra-ui/react'
import SubscriptionInformationText from './subscription_information_text'
import { useCurrentGame } from '@/hooks/useCurrentGame';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase';
import { setDoc, doc, collection, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type SubscriptionInformationAttributes = {
  currentSubscriptionPlan: string,
  blueslettersThisCycle: string,
  totalBluesletters: string,
  daysRemaining: string,
  viewsThisCycle: string,
  totalViews: string,
}
interface SubscriptionInformationProps {
  options: SubscriptionInformationAttributes;
}

export default function SubscriptionInformation(props: SubscriptionInformationProps) {
  const currentGame = useCurrentGame();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState({
    userid: "",
    username: "",
    picture: "",
    developer: false
  });
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const getUserData = async (uid: string) => {

      var docRef = doc(collection(db, "userbase"), uid);
      var userData = await getDoc(docRef);

      currentUser.userid = uid;
      currentUser.username = userData.data()?.username;
      currentUser.picture = userData.data()?.profile_image;
      currentUser.developer = userData.data()?.developer;

    };

    if (localStorage.getItem('currentUser') !== null && localStorage.getItem('currentUser') !== "") {
      getUserData(localStorage.getItem('currentUser')!);
    } else {
      router.push("/signin");
    }
  }, [currentUser, router]);

  async function saveData() {
    var tempGenres = []

    if (document.querySelector<HTMLInputElement>("#genre-1")!.value !== "") {
      tempGenres.push(document.querySelector<HTMLInputElement>("#genre-1")!.value);
    } 
    if (document.querySelector<HTMLInputElement>("#genre-2")!.value !== "") {
      tempGenres.push(document.querySelector<HTMLInputElement>("#genre-2")!.value);
    }
    
    var gameData = await getDoc(doc(collection(db, "games"), currentGame.currentGame.gameID));

    if (gameData.get("avg_rating") === undefined) {
      await setDoc(doc(db, "games", currentGame.currentGame.gameID), {
        avg_rating: 0,
      }, { merge: true });
    }

    if (gameData.get("reviews") === undefined) {
      await setDoc(doc(db, "games", currentGame.currentGame.gameID), {
        reviews: [],
      }, { merge: true });
    }

    await setDoc(doc(db, "games", currentGame.currentGame.gameID), {
      uid: currentGame.currentGame.gameID,
      name: document.querySelector<HTMLInputElement>("#game-name")!.value,
      developer_id: currentUser.userid,
      genre: tempGenres,
      description: document.querySelector<HTMLTextAreaElement>("#description")!.value,
      release_date: document.querySelector<HTMLInputElement>("#release-date")!.value,
      last_update: document.querySelector<HTMLInputElement>("#last-updated")!.value,
      avail_platforms: [document.querySelector<HTMLInputElement>("#available-on-ios")!.value, document.querySelector<HTMLInputElement>("#available-on-playstore")!.value],
      ios_store_link: document.querySelector<HTMLInputElement>("#ios-store-link")!.value,
      google_play_link: document.querySelector<HTMLInputElement>("#google-play-link")!.value,
      age_rating: document.querySelector<HTMLInputElement>("#age-rating")!.value,
      // Removed because of need to convert these URLs to base64
      // icon,
      // hero,
      // preview_images,
      active_status: document.querySelector<HTMLInputElement>("#current-plan")!.innerText === "Unselected Plan" ? 0 : 1,
      subscriptions: document.querySelector<HTMLInputElement>("#current-plan")!.innerText,
      days_remaining: document.querySelector<HTMLInputElement>("#days-remaining")!.innerText,
      game_views_cycle: parseInt(document.querySelector<HTMLInputElement>("#views-this-cycle")!.innerText),
      game_views_total: parseInt(document.querySelector<HTMLInputElement>("#views-total")!.innerText),
      letters_distributed_cycle: parseInt(document.querySelector<HTMLInputElement>("#letters-this-cycle")!.innerText),
      letters_distributed_total: parseInt(document.querySelector<HTMLInputElement>("#letters-total")!.innerText),
    }, { merge: true });
  }

  return (
    <>
      <Text fontWeight={"600"} fontSize={"18px"}>Subscription Information</Text>
      <Box bg={"rgba(255,255,255,0.2)"} borderRadius={"10"} marginBottom={"20px"}>
        <Grid
          templateAreas={`"leftColumn rightColumn"
                          "buttons buttons"`}
          templateColumns={"1fr 1fr"}
          padding={"15px 22px"}
          columnGap={"25px"}
          rowGap={"20px"}>
          <GridItem area={"leftColumn"}>
            <Flex direction={"column"} gap={"15px"}>
              <SubscriptionInformationText id={"current-plan"} title={"Current Subscription Plan"} data={props.options.currentSubscriptionPlan} />
              <SubscriptionInformationText id={"letters-this-cycle"} title={"Bluesletters This Cycle"} data={props.options.blueslettersThisCycle} />
              <SubscriptionInformationText id={"letters-total"} title={"Total Bluesletters"} data={props.options.totalBluesletters} />
            </Flex>
          </GridItem>
          <GridItem area={"rightColumn"}>
            <Flex direction={"column"} gap={"15px"}>
              <SubscriptionInformationText id={"days-remaining"} title={"Days Remaining"} data={props.options.daysRemaining} />
              <SubscriptionInformationText id={"views-this-cycle"} title={"Views This Cycle"} data={props.options.viewsThisCycle} />
              <SubscriptionInformationText id={"views-total"} title={"Total Views"} data={props.options.totalViews} />
            </Flex>
          </GridItem>
          <GridItem area={"buttons"}>
            <Flex direction={"column"} gap={"10px"} alignItems={"center"}>
              <Button
                isLoading={buttonLoading}
                variant={"red"}
                onClick={async () => {
                  setButtonLoading(true);
                  await saveData();
                  router.push("/developerDashboard/devGame/planSelection");
                }}
              >
                Manage Subscription
              </Button>
            <Button fontSize={"12px"} variant={"purple"} onClick={() => console.log("Downloaded Activity Log")}>Download Activity Log</Button>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}