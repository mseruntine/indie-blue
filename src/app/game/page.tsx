"use client"

import { Flex, Grid, GridItem, IconButton } from '@chakra-ui/react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import GameTitle from '@/components/ui/game/gameTitle'
import GameBody from '@/components/ui/game/gameBody'
import GameAlternate from '@/components/ui/game/gameAlternate'
import { useRouter } from 'next/navigation';
import { useCurrentGame } from '@/hooks/useCurrentGame'
import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
// import { waitUntilSymbol } from 'next/dist/server/web/spec-extension/fetch-event'

type review = {
    name:string;
    rating:number;
    reviewText:string;
}

// const title = "Clash Royale"
// const developer = "Supercell"
// const icon = "../images/clashroyaleicon.png"
// const genre = "Real-time Strategy";
// const releaseDate = "August 2nd, 2012";
// const listingDate = "November 16th, 2012";
// const lastUpdated = "November 13th, 2012";
// const heroImage = "../images/clashroyalehero.png";
// const iOSLink = "https://www.apple.com/app-store/";
// const GPSLink = "https://play.google.com/store/games?hl=en_US&gl=US&pli=1";
// const platforms = "iOS 16+, Google Play Store";
// const descImg1 = "../images/clashroyaleimg1.png";
// const descImg2 = "../images/clashroyaleimg2.png";
// const descImg3 = "../images/clashroyaleimg3.png";
// const descImg4 = "../images/clashroyaleimg4.png";
// const descImg5 = "../images/clashroyaleimg5.png";
// const descImg6 = "../images/clashroyaleimg6.png";
// const description = "Join millions of players worldwide as you build your village, raise a clan, and compete in epic Clan Wars!\n\n Mustachioed Barbarians, fire wielding Wizards, and other unique troops waiting for you! Enter the world of Clash!\n\n Classic Features:\n* Join a Clan of fellow players or start your own and invite friends.\n* Fight in a Clan Wars as a team against millions of active players across the globe."

export default function Game() {

    const router = useRouter();
    const selectedGame = useCurrentGame();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const gamesTableRef = collection(db, "games");
    const usersTableRef = collection(db, "userbase");

    const [title, setTitle] = useState("");
    const [developer, setDeveloper] = useState("");
    const [icon, setIcon] = useState("");
    const [genre, setGenre] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [listingDate, setListingDate] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");
    const [heroImage, setHeroImage] = useState("");
    const [iOSLink, setiOSLink] = useState("");
    const [GPSLink, setGPSLink] = useState("");
    const [platforms, setPlatforms] = useState("");
    const [descImg1, setDescImg1] = useState("");
    const [descImg2, setDescImg2] = useState("");
    const [descImg3, setDescImg3] = useState("");
    const [descImg4, setDescImg4] = useState("");
    const [descImg5, setDescImg5] = useState("");
    const [descImg6, setDescImg6] = useState("");
    const [description, setDescription] = useState("");
    const [ageRating, setAgeRating] = useState("");
    const [reviews, setReviews] = useState<review[]>([]);

    const getDevUsername = async (uid: string) => {

        var username;
  
        try {
  
          var docRef = doc(usersTableRef, uid);
          var devData = await getDoc(docRef);
          // console.log(devData.data()!.username);
          username = devData.data()!.username;
  
        } catch (error) {
  
          console.log(error)
          setError(true);
          setLoading(false);
  
        }
  
        return username;
  
      }

    const getGameData = async (id : string) => {

        try {

            var docRef = doc(gamesTableRef, id);
            var gameData = await getDoc(docRef);
            console.log(gameData.data());

            setTitle(gameData.data()!.name);
            setDeveloper(await getDevUsername(gameData.data()!.developer_id));
            setIcon(gameData.data()!.icon);
            setReleaseDate(gameData.data()!.release_date);
            setListingDate(gameData.data()!.list_date);
            setLastUpdated(gameData.data()!.last_update);
            setHeroImage(gameData.data()!.hero);
            setiOSLink(gameData.data()!.ios_store_link);
            setGPSLink(gameData.data()!.google_play_link);
            // setPlatforms
            setDescImg1(gameData.data()!.preview_images[0]);
            setDescImg2(gameData.data()!.preview_images[1]);
            setDescImg3(gameData.data()!.preview_images[2]);
            setDescImg4(gameData.data()!.preview_images[3]);
            setDescImg5(gameData.data()!.preview_images[4]);
            setDescImg6(gameData.data()!.preview_images[5]);
            setDescription(gameData.data()!.description);
            setAgeRating(gameData.data()!.age_rating);

            var genreString = "";
            var genreArray = gameData.data()!.genre;
            for (var i = 0; i < genreArray.length; i++) {
                genreString += genreArray[i];
                if (i != genreArray.length - 1) {
                    genreString += ", ";
                }
            }
            setGenre(genreString);

            var platformsString = "";
            var platformsArray = gameData.data()!.avail_platforms;
            if (platformsArray[0] === "Yes") { 
                platformsString += "iOS";
                if (platformsArray[1] === "Yes") { platformsString += ", " }
            }
            if (platformsArray[1] === "Yes") { platformsString += "Google Play Store" }

            setPlatforms(platformsString);

            
            var reviewsArray = gameData.data()!.reviews;
            
            let j = 0;
            while(reviewsArray[j] != null)
            {
                var name:string = await getDevUsername(reviewsArray[j][0]);
                var temp = {
                    name: name,
                    rating: reviewsArray[j][2],
                    reviewText: reviewsArray[j][1],
                }
                reviews[j] = temp;
                j++;
            }

            console.log(reviews);

            setLoading(false);
    
          } catch (error) {
    
            console.log(error)
            setError(true);
            setLoading(false);
    
          }

    }

    useEffect(() => {

        console.log("Game Page Loaded")
        console.log(selectedGame.currentGame.gameName);
        console.log(selectedGame.currentGame.gameID);

        getGameData(selectedGame.currentGame.gameID);

    }, [])

    console.log(reviews);

    return (
        <>
            {loading ? null : <Grid
            templateAreas={`"back back"
            "title title"
            "body alternate"`}
            templateColumns="3fr 300px"
            padding={"24px 0px"}
            columnGap="48px"
            rowGap={"16px"}
            w={"full"}>
                <GridItem area={"back"}>
                    <Flex>
                        <IconButton as={IoMdArrowRoundBack} aria-label="Back button" height={"50px"} width={"50px"} variant="unstyled" transition={"all 0.2s ease-in-out"} _hover={{ cursor: "pointer", transform: "scale(1.1)" }} onClick={() => { router.push("/explore"); }} />
                    </Flex>
                </GridItem>
                <GridItem area="title">
                    <GameTitle icon={icon} title={title} dev={developer} />
                </GridItem>
                <GridItem area="body">
                    <GameBody
                    heroImage={heroImage}
                    image1={descImg1}
                    image2={descImg2}
                    image3={descImg3}
                    image4={descImg4}
                    image5={descImg5}
                    image6={descImg6}
                    desc={description}
                    genre={genre}
                    reviews={reviews}
                    />
                </GridItem>
                <GridItem area="alternate">
                    <GameAlternate 
                    developer={developer}
                    releaseDate={releaseDate}
                    listingDate={listingDate}
                    lastUpdated={lastUpdated}
                    platforms={platforms}
                    iOSLink={iOSLink}
                    GPSLink={GPSLink}
                    ageRating={ageRating}
                    />
                </GridItem>
            </Grid>}
        </>
    )
}