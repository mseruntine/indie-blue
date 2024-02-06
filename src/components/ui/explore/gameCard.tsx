import { useCurrentGame } from '@/hooks/useCurrentGame';
import { Text, Flex, Grid, GridItem, Image, Container } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';

interface GameCardProps {
  title: string;
  icon: string;
  hero: string;
  developer: string;
  genre: string;
  id: string;
}

// This handles styling for the data for each game card. Currently unfinished. 
export default function GameCard(props: GameCardProps) {

  const selectedGame = useCurrentGame();
  const router = useRouter();
  const randNum = (Math.floor(Math.random() * 3 ) + 1);
  let bgColor:string = "";

  if(randNum == 1){ bgColor = "primary.600"}
  else if (randNum == 2){ bgColor = "secondary.700"}
  else { bgColor = "tertiary.600"}

  return (
    <>
    <Container p="8px" transition={"all 0.2s ease-in-out"} borderRadius="13px" _hover={{ cursor: "pointer", bgColor: bgColor }} onClick={() => {
      selectedGame.currentGame.gameName = props.title;
      console.log(selectedGame.currentGame.gameName);
      selectedGame.currentGame.gameID = props.id;
      console.log(selectedGame.currentGame.gameID);
      router.push("/game");
    }} data-group>
      <Grid
        templateAreas={`"hero hero" 
                        "icon text"`}
        templateColumns={"64px 1fr"}
        templateRows={"1fr 64px"}
        columnGap="12px"
        rowGap="12px"
      >
        <GridItem area="hero" aspectRatio={16 / 9}>
          <Image w="100%" h="100%" objectFit="cover" borderRadius="10px" src={props.hero} alt="Game Hero"></Image>
        </GridItem>
        <GridItem area="icon">
          <Image w="100%" h="100%" borderRadius={"10px"} src={props.icon} alt='Game Logo'></Image>
        </GridItem>
        <GridItem area="text">
          <Flex direction={"column"} justifyContent={"space-around"}>
            <Text fontSize={"20px"} fontWeight={"700"} mb="-4px" overflowX="clip" noOfLines={1}>{props.title}</Text>
            <Text fontSize={"13px"} fontWeight={"400"} mb="-2px" overflowX="clip" noOfLines={1}>{props.developer}</Text>
            <Flex direction={"row"}>
              <Text fontSize={"13px"} fontWeight={"400"} overflowX="clip" noOfLines={1} color="#FFFFFF88">{props.genre}</Text>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
      </Container>
    </>
  )
}