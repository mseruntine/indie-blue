"use client"

import LeftSection from '@/components/ui/devGame/left_section'
import RightSection from '@/components/ui/devGame/right_section'
import { db } from '@/firebase'
import { useCurrentGame } from '@/hooks/useCurrentGame'
import { Button, Flex, Grid, GridItem, IconButton } from '@chakra-ui/react'
import { doc, collection, getDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

export default function DevGame() {
  const router = useRouter();
  const currentGame = useCurrentGame();
  const [currentUser, setCurrentUser] = useState({
    userid: "",
    username: "",
    picture: "",
    developer: false
  });
  const [buttonLoading1, setButtonLoading1] = useState(false);
  const [buttonLoading2, setButtonLoading2] = useState(false);

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
      <Grid
        templateAreas={`"heading heading"
            "leftColumn rightColumn"`}
        templateColumns="1fr 1fr"
        padding={"50px 0px"}
        columnGap="150px"
        rowGap={"25px"}>
        <GridItem area={"heading"}>
          <Flex>
            <IconButton as={IoMdArrowRoundBack} aria-label="Back button" height={"50px"} width={"50px"} variant="unstyled"
              transition={"all 0.2s ease-in-out"} _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
              onClick={() => {
                router.push("/developerDashboard")
              }} />
          </Flex>
        </GridItem>
        <GridItem area={"leftColumn"}>
          <LeftSection />
        </GridItem>
        <GridItem area={"rightColumn"}>
          <RightSection />
        </GridItem>
      </Grid>
      <Flex direction={"row"} gap={"50px"} padding={"40px 0px"}>
        <Button isLoading={buttonLoading1} variant={"red"} onClick={() => {
          setButtonLoading1(true);
          router.push("/developerDashboard")
        }}>Cancel Changes</Button>
        <Button isLoading={buttonLoading2} variant={"purple"} onClick={async () => {
          setButtonLoading2(true);
          await saveData();
          console.log("Saved & Returning to dashboard...")
          router.push("/developerDashboard")
        }}>Save & Return</Button>
      </Flex>
    </>
  )
}
