"use client"

import { Button, Text, Grid, GridItem, Image, Flex, Spacer, Divider, UnorderedList } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import BluelightGame from '@/components/ui/bluesletter/bluelightGame';
import BluesletterTab from '@/components/ui/bluesletter/bluesletterTab';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import React from 'react';
import NeedAccount from '@/components/ui/needAccount';

// Bluelight
// const bluelightID = "00000001";
// const bluelightHero = "../images/smr_hero.jpg";
// const bluelightIcon = "../images/smr.png";
// const bluelightTitle = "Super Mario Run";
// const bluelightPublisher = "Nintendo Co., Ltd.";
// const bluelightGenre = "Action, Platformer";
// const bluelightDescription = "A new kind of Mario game that you can play with one hand. \n\nYou control Mario by tapping as he constantly runs forward. You time your taps to pull off stylish jumps, midair spins, and wall jumps to gather coins and reach the goal!";

// const tempBluesletters = [
//   {
//     id: "00000001",
//     date: "November 17th, 2023",
//     games: [
//       {
//         id: "00000001",
//         name: "Pokemon Go",
//         publisher: "Game Freak",
//         genre: "Strategy, Multiplayer",
//         description: "Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. The rats made me crazy. Crazy? I was crazy once. They locked me in a room. A rubber room. A rubber room with rats. The rats made me crazy. Crazy? I was crazy once.",
//         hero: "../images/heroImage.png",
//         icon: "../images/pokeIcon.png",
//       },
//       {
//         id: "00000002",
//         name: "Super Mario Run",
//         publisher: "Nintendo",
//         genre: "Action, Platformer",
//         description: "A new kind of Mario game that you can play with one hand. \n\nYou control Mario by tapping as he constantly runs forward. You time your taps to pull off stylish jumps, midair spins, and wall jumps to gather coins and reach the goal!",
//         hero: "../images/heroMario.png",
//         icon: "../images/smr.png",
//       },
//       {
//         id: "00000003",
//         name: "Minecraft",
//         publisher: "Mojang",
//         genre: "Sandbox, Survival",
//         description: "Creeper! Awwwww man. So we back in the mine, got my pickaxe swinging from side-to-side. Side-side-to-side.",
//         hero: "../images/heroMinecraft.png",
//         icon: "../images/mc.png",
//       },
//     ]
//   },
//   {
//     id: "00000002",
//     date: "November 17th, 2023",
//     games: [
//       {
//         id: "00000001",
//         name: "Pokemon Go",
//         publisher: "Game Freak",
//         genre: "Strategy, Multiplayer",
//         description: "Pokemon Go temporary description.",
//         hero: "../images/heroImage.png",
//         icon: "../images/pokeIcon.png",
//       },
//       {
//         id: "00000002",
//         name: "Super Mario Run",
//         publisher: "Nintendo",
//         genre: "Action, Platformer",
//         description: "Super Mario Run temporary description.",
//         hero: "../images/heroMario.png",
//         icon: "../images/smr.png",
//       },
//       {
//         id: "00000003",
//         name: "Minecraft",
//         publisher: "Mojang",
//         genre: "Sandbox, Survival",
//         description: "Minecraft temporary description.",
//         hero: "../images/heroMinecraft.png",
//         icon: "../images/mc.png",
//       },
//     ]
//   },
//   {
//     id: "00000003",
//     date: "November 17th, 2023",
//     games: [
//       {
//         id: "00000001",
//         name: "Pokemon Go",
//         publisher: "Game Freak",
//         genre: "Strategy, Multiplayer",
//         description: "Pokemon Go temporary description.",
//         hero: "../images/heroImage.png",
//         icon: "../images/pokeIcon.png",
//       },
//       {
//         id: "00000002",
//         name: "Super Mario Run",
//         publisher: "Nintendo",
//         genre: "Action, Platformer",
//         description: "Super Mario Run temporary description.",
//         hero: "../images/heroMario.png",
//         icon: "../images/smr.png",
//       },
//       {
//         id: "00000003",
//         name: "Minecraft",
//         publisher: "Mojang",
//         genre: "Sandbox, Survival",
//         description: "Minecraft temporary description.",
//         hero: "../images/heroMinecraft.png",
//         icon: "../images/mc.png",
//       },
//     ]
//   },
//   {
//     id: "00000004",
//     date: "November 17th, 2023",
//     games: [
//       {
//         id: "00000001",
//         name: "Pokemon Go",
//         publisher: "Game Freak",
//         genre: "Strategy, Multiplayer",
//         description: "Pokemon Go temporary description.",
//         hero: "../images/heroImage.png",
//         icon: "../images/pokeIcon.png",
//       },
//       {
//         id: "00000002",
//         name: "Super Mario Run",
//         publisher: "Nintendo",
//         genre: "Action, Platformer",
//         description: "Mama Mia! Mama Mia! Mama Mia! Mama Mia! Mama Mia! Mama Mia! Mama Mia! Mama Mia! Mama Mia! Mama Mia! ",
//         hero: "../images/heroMario.png",
//         icon: "../images/smr.png",
//       },
//       {
//         id: "00000003",
//         name: "Minecraft",
//         publisher: "Mojang",
//         genre: "Sandbox, Survival",
//         description: "Minecraft temporary description.",
//         hero: "../images/heroMinecraft.png",
//         icon: "../images/mc.png",
//       },
//     ]
//   },
// ]

// const bluesletters = userBluesletters.map((bluesletter) =>
// <BluesletterTab key={bluesletter.id} games={bluesletter.games} date={bluesletter.date} /> )

export default function Bluesletter() {

  type GameAttributes = {
    id: string;
    name: string;
    publisher: string;
    genre: string;
    description: string;
    hero: string;
  }

  type BluesletterAttributes = {
    id: string;
    date: string;
    games: GameAttributes[];
  }

  const router = useRouter();
  const gamesTableRef = collection(db, "games");
  const usersTableRef = collection(db, "userbase");
  const blueslettersTableRef = collection(db, "bluesletter");
  const [loggedIn, setLoggedIn] = useState(false);
  const [bluelightIcon, setBluelightIcon] = useState("");
  const [bluelightID, setBluelightID] = useState("");
  const [bluelightHero, setBluelightHero] = useState("");
  const [bluelightTitle, setBluelightTitle] = useState("");
  const [bluelightPublisher, setBluelightPublisher] = useState("");
  const [bluelightGenre, setBluelightGenre] = useState("");
  const [bluelightDescription, setBluelightDescription] = useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  // const [userBluesletters, setUserBluesletters] = React.useState(GameA[]);
  // create a state variable for the bluesletters array with the type of the array being game attributes
  const [userBluesletters, setUserBluesletters] = useState<BluesletterAttributes[]>([]);

  const bluesletters = userBluesletters.map((bluesletter) =>
    <BluesletterTab key={bluesletter.id} games={bluesletter.games} date={bluesletter.date} />)

  useEffect(() => {

    const getDevUsername = async (uid: string) => {

      try {

        var docRef = doc(usersTableRef, uid);
        var devData = await getDoc(docRef);
        console.log(devData.data()!.username);
        setBluelightPublisher(devData.data()!.username);

      } catch (error) {

        console.log(error)
        setError(true);
        setLoading(false);

      }

    }

    const getUsername = async (uid: string) => {

      var username = "";
      try {

        var docRef = doc(usersTableRef, uid);
        var userData = await getDoc(docRef);
        username = userData.data()!.username;

      } catch (error) {

        console.log(error)
        setError(true);
        setLoading(false);

      }

      return username;

    }

    const getUserBluesletters = async () => {

      try {

        var userID = localStorage.getItem('currentUser');
        var userDocRef = doc(usersTableRef, userID!);
        var userData = await getDoc(userDocRef);
        // setUserBluesletters(userData.data()!.bluesletters);
        // console.log(userBluesletters);

        var tempBluesLetters = [];
        for (var i = userData.data()!.bluesletters.length - 1; i >= 0; i--) {

          var bluesletterDocRef = doc(blueslettersTableRef, userData.data()!.bluesletters[i]);
          var bluesletterData = await getDoc(bluesletterDocRef);
          // console.log(bluesletterData.data()!.date);

          var tempGames = [];
          for (var j = 0; j < bluesletterData.data()!.games.length; j++) {

            var gameDocRef = doc(gamesTableRef, bluesletterData.data()!.games[j]);
            var gameData = await getDoc(gameDocRef);
            // console.log(gameData.data()!.name);
            // console.log(gameData.data()!.genre);

            var tempGenreString = "";
            var tempGenreArray = gameData.data()!.genre;
            for (var k = 0; k < tempGenreArray.length; k++) {
              tempGenreString += tempGenreArray[k];
              if (k != tempGenreArray.length - 1) {
                tempGenreString += ", ";
              }
            }

            var tempGameData = {
              id: gameData.data()!.uid,
              name: gameData.data()!.name,
              publisher: await getUsername(gameData.data()!.developer_id),
              genre: tempGenreString,
              description: gameData.data()!.description,
              hero: gameData.data()!.hero,
              icon: gameData.data()!.icon
            };
            // console.log(tempGameData);

            tempGames.push(tempGameData);

          }

          var tempBluesletter = {
            id: bluesletterData.data()!.uid,
            date: bluesletterData.data()!.date,
            games: tempGames
          };

          tempBluesLetters.push(tempBluesletter);

        }
        // console.log(tempBluesLetters);
        setUserBluesletters(tempBluesLetters);

      } catch (error) {

        console.log(error)
        setError(true);
        setLoading(false);

      }

      setLoading(false);

    }

    const getBluelightIcon = async () => {

      try {

        var docRef = doc(gamesTableRef, "0");
        var gameData = await getDoc(docRef);
        console.log(gameData.data()!.hero);
        setBluelightIcon(gameData.data()!.icon);
        setBluelightID(gameData.data()!.uid);
        setBluelightHero(gameData.data()!.hero);
        setBluelightTitle(gameData.data()!.name);
        await getDevUsername(gameData.data()!.developer_id);
        setBluelightDescription(gameData.data()!.description);

        var genreString = "";
        var genreArray = gameData.data()!.genre;
        for (var i = 0; i < genreArray.length; i++) {
          genreString += genreArray[i];
          if (i != genreArray.length - 1) {
            genreString += ", ";
          }
        }
        setBluelightGenre(genreString);

      } catch (error) {

        console.log(error)
        setError(true);
        setLoading(false);

      }

    }

    if (localStorage.getItem('currentUser') !== null && localStorage.getItem('currentUser') !== "") {
      setLoggedIn(true);
    }
    getBluelightIcon();
    getUserBluesletters();

  }, []);

  return (
    <>
      {loading === false ?
        (loggedIn === true ?
          <>
            <BluelightGame
              bluelightID={bluelightID}
              bluelightHero={bluelightHero}
              bluelightIcon={bluelightIcon}
              bluelightTitle={bluelightTitle}
              bluelightPublisher={bluelightPublisher}
              bluelightGenre={bluelightGenre}
              bluelightDesc={bluelightDescription} />
            <Flex direction="row" mt="48px" w="100%">
              <Text fontSize="24px" fontWeight="700">Your Bluesletters</Text>
              <Spacer />
              <Text fontSize="16px" color="#FFFFFF88" mt="auto" transition={"all 0.2s ease-in-out"} _hover={{ cursor: "pointer", textColor: "#FFFFFF", transform: "scale(1.02)" }}>Want to change your Bluesletter settings?</Text>
            </Flex>
            <Divider mt="16px" mb="-8px" borderColor="#FFFFFF88" />
            <UnorderedList>{bluesletters}</UnorderedList>
            <Text color="#FFFFFF88" m="-16px auto 64px 24px">You&apos;re all caught up! This is every Bluesletter you received in the past year.</Text>
          </> : <NeedAccount />) : null}
    </>
  )
}
