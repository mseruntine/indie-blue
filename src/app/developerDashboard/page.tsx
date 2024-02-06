"use client"

import GameList from '@/components/ui/developerDashboard/gameList'
import Statistics from '@/components/ui/developerDashboard/statistics';
import { db } from '@/firebase';
import { useCurrentGame } from '@/hooks/useCurrentGame';
import { Box, Button, Divider, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { doc, collection, getDoc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// const tempGames1 = [
//   {
//     title: "Super Mario Run",
//     icon: "../images/smr.png",
//     plan: "Standard Plan",
//     daysRemaining: 5
//   },
//   {
//     title: "Super Mario Run",
//     icon: "../images/smr.png",
//     plan: "Standard Plan",
//     daysRemaining: 5
//   },
//   {
//     title: "Super Mario Run",
//     icon: "../images/smr.png",
//     plan: "Standard Plan",
//     daysRemaining: 5
//   },
// ];

// const tempGames2 = [
//   {
//     title: "Minecraft",
//     icon: "../images/mc.png",
//     plan: "Deluxe Plan",
//     daysRemaining: 12
//   },
//   {
//     title: "Minecraft",
//     icon: "../images/mc.png",
//     plan: "Deluxe Plan",
//     daysRemaining: 12
//   },
// ];

// const tempGames3 = [
//   {
//     title: "Super Mario Run",
//     icon: "../images/smr.png",
//     plan: "Standard Plan",
//     daysRemaining: 5
//   },
//   {
//     title: "Minecraft",
//     icon: "../images/mc.png",
//     plan: "Deluxe Plan",
//     daysRemaining: 12
//   }
// ];

export default function DeveloperDashboard() {
  const currentGame = useCurrentGame();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState({
    userid: "",
    username: "",
  });
  type gameAttributes = {
    title: string;
    icon: string;
    plan: string;
    daysRemaining: number;
    id: string;
  }

  const [publishedGamesToDisplay, setPublishedGamesToDisplay] = useState<gameAttributes[]>([]);
  const [unpublishedGamesToDisplay, setUnpublishedGamesToDisplay] = useState<gameAttributes[]>([]);
  const gamesTableRef = collection(db, "games");
  const userDBName = "userbase";
  const usersTableRef = collection(db, userDBName);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(false);

  var totalBlueslettersThisCycle = useRef(0);
  var totalBlueslettersAllTime = useRef(0);
  var gameViewsThisCycle = useRef(0);
  var gameViewsAllTime = useRef(0);
  var reviewsThisCycle = useRef(0);
  var reviewsAllTime = useRef(0);
  var averageRatingThisCycle = useRef(0);
  var newGameID = useRef(0);

  useEffect(() => {
    
    const getUserData = async (uid: string) => {

      var docRef = doc(usersTableRef, uid);
      var userData = await getDoc(docRef);
  
      currentUser.userid = uid;
      currentUser.username = userData.data()?.username;

      setLoading(false);
    };

    const loadGames = async () => {

      try {

        const querySnapshot = await getDocs(gamesTableRef);
        var tempPublishedGames: gameAttributes[] = [];
        var tempUnpublishedGames: gameAttributes[] = [];

        querySnapshot.forEach(game => {

          var gameData = game.data();
          
          if (currentUser.userid == gameData.developer_id) {
            var temp = {
              id: gameData.uid,
              title: gameData.name,
              icon: gameData.icon,
              plan: gameData.subscriptions,
              daysRemaining: gameData.days_remaining,
            };

            if (gameData.active_status == 1) {
              averageRatingThisCycle.current += gameData.avg_rating;
              totalBlueslettersThisCycle.current += gameData.letters_distributed_cycle;
              totalBlueslettersAllTime.current += gameData.letters_distributed_total;
              gameViewsThisCycle.current += gameData.game_views_cycle;
              gameViewsAllTime.current += gameData.game_views_total;
              reviewsThisCycle.current += gameData.reviews.length;
              reviewsAllTime.current += gameData.reviews.length;
              tempPublishedGames.push(temp);
            }
            else if (gameData.active_status == 0) {
              tempUnpublishedGames.push(temp);
            }
          }
          
          if(parseInt(gameData.uid) > newGameID.current) {
            newGameID.current = gameData.uid;
          }
        });

        averageRatingThisCycle.current = averageRatingThisCycle.current / tempPublishedGames.length;
        newGameID.current++;

        setPublishedGamesToDisplay(tempPublishedGames);
        setUnpublishedGamesToDisplay(tempUnpublishedGames);

        setLoading(false);

      } catch (error) {

        console.log(error);
        setError(true);
        setLoading(false);

      }

    };

    if (localStorage.getItem('currentUser') !== null && localStorage.getItem('currentUser') !== "") {
      getUserData(localStorage.getItem('currentUser')!);
      loadGames();
    } else {
      router.push("/signin");
    }

  }, []);

  return (
    <>
      {loading === false ? <Grid
        templateAreas={`"heading heading" 
                        "games data"`}
        templateColumns="2.5fr 1fr"
        paddingTop={"50px"}
        paddingBottom={"50px"}
        columnGap="150px">
        <GridItem marginBottom={10} area={"heading"}>
          <Heading>{currentUser.username}&rsquo;s Developer Dashboard</Heading>
        </GridItem>
        <GridItem area={"games"}>
          <GameList title={"Published Games"} games={publishedGamesToDisplay} />
          <GameList title={"Unpublished Games"} games={unpublishedGamesToDisplay} />
        </GridItem>
        <GridItem display="flex" flexDirection={"column"} area={"data"}>
          <Flex direction={"column"} width={"450px"}>
            <Flex flexWrap="wrap" justifyContent={"center"} alignItems={"center"} marginBottom={"40px"}>
              <Button isLoading={buttonLoading} width={"100%"} height={"50px"} variant={"purple"} fontSize={20} marginBottom={"40px"} onClick={() => { 
                setButtonLoading(true);
                currentGame.currentGame.gameID = newGameID.current.toString();
                currentGame.currentGame.gameName = "";
                currentGame.currentGame.paymentPlanName = "Unselected Plan";
                currentGame.currentGame.paymentPlanPrice = "$x.xx";
                router.push("/developerDashboard/devGame"); 
              }}>Upload a New Game</Button>
              <Flex direction={"column"} width={"100%"}>
                <Text fontSize={"24px"} fontWeight={"800"} textAlign={"left"} mb="-20px">Your Total Interactions</Text>
              </Flex>
            </Flex>
            <Box paddingX={"2px"}>
              <Statistics name={"Total Bluesletters This Cycle"} number={totalBlueslettersThisCycle.current} />
              <Statistics name={"Total Bluesletters All-Time"} number={totalBlueslettersAllTime.current} />
              <Divider margin={"20px 0px"} />
              <Statistics name={"Game Views This Cycle"} number={gameViewsThisCycle.current} />
              <Statistics name={"Game Views All-Time"} number={gameViewsAllTime.current} />
              <Divider margin={"20px 0px"} />
              <Statistics name={"Reviews This Cycle"} number={reviewsThisCycle.current} />
              <Statistics name={"Reviews All-Time"} number={reviewsAllTime.current} />
              <Statistics name={"Average Rating This Cycle"} number={averageRatingThisCycle.current} toFixed/>
            </Box>
          </Flex>
        </GridItem>
      </Grid> : null}
    </>
  )
}
