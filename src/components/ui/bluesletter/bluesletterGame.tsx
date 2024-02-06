import { Flex, Image, Text, Button, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { useCurrentGame } from '@/hooks/useCurrentGame';

type GameAttributes = {
    id: string;
    name: string;
    publisher: string;
    genre: string;
    description: string;
    hero: string;
}

interface BluesletterGameProps {
    game: GameAttributes;
}

export default function BluesletterGame(props:BluesletterGameProps) {
    const selectedGame = useCurrentGame();
    const router = useRouter();
    const randNum = (Math.floor(Math.random() * 3 ) + 1);
    let bgColor:string = "";

    if(randNum == 1){ bgColor = "primary.600"}
    else if (randNum == 2){ bgColor = "secondary.700"}
    else { bgColor = "tertiary.600"}
    
    return (
        <>
            <Flex direction="column" justify="space-between" mx="16px" p="16px" minW="31%" maxW="31%" borderRadius="16px" transition={"all 0.2s ease-in-out"} _hover={{ cursor: "pointer", bgColor:bgColor, transform: "scale(1.03)" }} 
                onClick={() => {
                    selectedGame.currentGame.gameName = props.game.name;
                    console.log(selectedGame.currentGame.gameName);
                    selectedGame.currentGame.gameID = props.game.id;
                    console.log(selectedGame.currentGame.gameID);
                    router.push("/game");
                }}>
                <Flex w="100%" direction="column">
                    <Image src={props.game.hero} objectFit="cover" aspectRatio={16 / 9} alt='Hero Image' borderRadius="12px" w="100%" h="100%" />
                    <Flex>
                        <Text fontSize="32px" fontWeight="700" mt="16px" h="48px" noOfLines={1}>{props.game.name}</Text>
                    </Flex>
                    <Text fontSize="20px" fontWeight="400" mt="-4px" >{props.game.publisher}</Text>
                    <Text fontSize="16px" fontWeight="500" color="#FFFFFF88" >{props.game.genre}</Text>
                    <Flex>
                        <Text fontSize="16px" fontWeight="500" pt="16px" noOfLines={6} >{props.game.description}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}