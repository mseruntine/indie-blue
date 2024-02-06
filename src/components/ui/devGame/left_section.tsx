import { Flex, Grid, GridItem } from '@chakra-ui/react'
import FormElement from './form_element'
import SelectForm from './select_form'
import TextAreaForm from './text_area_form'
import { useCurrentGame } from '@/hooks/useCurrentGame';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export default function LeftSection() {
  const genreOptions = ["Action", "Adventure", "Arcade", "Casino", "Casual", "Fantasy", "Multiplayer", "Platformer", "Puzzle", "Racing", "RPG", "Sandbox", "Simulation", "Singleplayer", "Sports", "Strategy", "Survival"];
  const availableOnOptions = ["Yes", "No"];
  const ageRatingOptions = ["4+", "9+", "12+", "17+"];

  const currentGame = useCurrentGame();
  const gamesTableRef = collection(db, "games");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [genre1, setGenre1] = useState("");
  const [genre2, setGenre2] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [availableOnIOS, setAvailableOnIOS] = useState("No");
  const [availableOnPlayStore, setAvailableOnPlayStore] = useState("No");
  const [iOSLink, setiOSLink] = useState("");
  const [GPSLink, setGPSLink] = useState("");
  const [ageRating, setAgeRating] = useState("");

  const getGameData = async (id: string) => {

    try {

      var docRef = doc(gamesTableRef, id);
      var gameData = await getDoc(docRef);

      var genreArray = gameData.data()!.genre;
      setGenre1(genreArray[0]);
      if (genreArray.length > 1) {
        setGenre2(genreArray[1]);
      }
      setDescription(gameData.data()!.description);
      setReleaseDate(gameData.data()!.release_date);
      setLastUpdated(gameData.data()!.last_update);

      var platformsArray = gameData.data()!.avail_platforms;
      if (platformsArray[0] === "Yes") { setAvailableOnIOS("Yes") }
      if (platformsArray[1] === "Yes") { setAvailableOnPlayStore("Yes") }
      setiOSLink(gameData.data()!.ios_store_link);
      setGPSLink(gameData.data()!.google_play_link);
      setAgeRating(gameData.data()!.age_rating);

      setLoading(false);
    } catch (error) {
      console.log(error)
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentGame.currentGame.gameID !== "") {
      console.log(currentGame.currentGame.gameID);
      getGameData(currentGame.currentGame.gameID);
    }
    else {
      setLoading(false);
    }

  }, [])

  return (
    <>
      {loading === false ?
        <Flex direction={"column"} gap={"15px"}>
          <FormElement id={"game-name"} title={"Game Name"} prefilled={currentGame.currentGame.gameName} gameName />
          <Grid gridTemplateColumns={"1fr 1fr"} columnGap={12}>
            <GridItem colSpan={1}>
              <SelectForm id={"genre-1"} title={"Genre 1"} placeholder={"Select a Genre"} options={genreOptions} prefilled={genre1} />
            </GridItem>
            <GridItem colSpan={1}>
              <SelectForm id={"genre-2"} title={"Genre 2"} placeholder={"Select a Genre"} options={genreOptions} prefilled={genre2} />
            </GridItem>
          </Grid>
          <TextAreaForm id={"description"} title={"Description"} prefilled={description} customHeight='200px' />
          <Grid gridTemplateColumns={"1fr 1fr"} columnGap={12}>
            <GridItem colSpan={1}>
              <FormElement id={"release-date"} title={"Release Date"} prefilled={releaseDate} />
            </GridItem>
            <GridItem colSpan={1}>
              <FormElement id={"last-updated"} title={"Last Updated"} prefilled={lastUpdated} />
            </GridItem>
          </Grid>
          <Grid gridTemplateColumns={"1fr 1fr"} columnGap={12}>
            <GridItem colSpan={1}>
              <SelectForm id={"available-on-ios"} title={"Available on iOS"} options={availableOnOptions} prefilled={availableOnIOS} />
            </GridItem>
            <GridItem colSpan={1}>
              <SelectForm id={"available-on-playstore"} title={"Available on Play Store"} options={availableOnOptions} prefilled={availableOnPlayStore} />
            </GridItem>
          </Grid>
          <Grid gridTemplateColumns={"1fr 1fr"} columnGap={12}>
            <GridItem colSpan={1}>
              <TextAreaForm id={"ios-store-link"} title={"iOS App Store Link"} prefilled={iOSLink} customHeight='150px' />
            </GridItem>
            <GridItem colSpan={1}>
              <TextAreaForm id={"google-play-link"} title={"Google Play Store Link"} prefilled={GPSLink} customHeight='150px' />
            </GridItem>
          </Grid>
          <SelectForm id={"age-rating"} title={"Age Rating"} options={ageRatingOptions} prefilled={ageRating}></SelectForm>
        </Flex> : null}
    </>
  )
}