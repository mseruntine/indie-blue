import { Flex, Text, Divider } from '@chakra-ui/react'
import BluesletterGame from './bluesletterGame';

type GameAttributes = {
    id: string;
    name: string;
    publisher: string;
    genre: string;
    description: string;
    hero: string;
}

interface BluesletterTabProps {
    games: GameAttributes[];
    date: string;
}

    // const date = "November 17th, 2023"

    // const game1ID = "00000001";
    // const game1Name = "Super Mario Run";
    // const game1Publisher = "Nintendo Co., Ltd.";
    // const game1Genre = "Action, Platformer";
    // const game1Description = "A new kind of Mario game that you can play with one hand. \n\nYou control Mario by tapping as he constantly runs forward. You time your taps to pull off stylish jumps, midair spins, and wall jumps to gather coins and reach the goal!";
    // const game1Hero = "../images/smr_hero.jpg";
    // const game1Link = "/";
    // const game1FeedbackLink = "/";

    // const game2ID = "00000001";
    // const game2Name = "Super Mario Run";
    // const game2Publisher = "Nintendo Co., Ltd.";
    // const game2Genre = "Action, Platformer";
    // const game2Description = "Mama Mia! Mama Mia! Mama Mia! Mama Mia! Mama Mia! A new kind of Mario game that you can play with one hand. \n\nYou control Mario by tapping as he constantly runs forward. You time your taps to pull off stylish jumps, midair spins, and wall jumps to gather coins and reach the goal!";
    // const game2Hero = "../images/smr_hero.jpg";
    // const game2Link = "/";
    // const game2FeedbackLink = "/";

    // const game3ID = "00000001";
    // const game3Name = "Super Mario Run";
    // const game3Publisher = "Nintendo Co., Ltd.";
    // const game3Genre = "Action, Platformer";
    // const game3Description = "A new kind of Mario game that you can play with one hand. \n\nYou control Mario by tapping as he constantly runs forward. You time your taps to pull off stylish jumps, midair spins, and wall jumps to gather coins and reach the goal!";
    // const game3Hero = "../images/smr_hero.jpg";
    // const game3Link = "/";
    // const game3FeedbackLink = "/";

export default function BluesletterTab(props:BluesletterTabProps) {
    return (
        <>
            <Flex direction="column" w="100%" bg="#FFFFFF34" borderRadius="12px" my="48px">
                <Text fontSize="16px" fontWeight="600" letterSpacing={"widest"} p="16px 24px">{props.date}</Text>
                <Divider borderColor="FFFFFF88" />
                <Flex direction="row" justify="center" p="16px">
                    {props.games.map((game) => {
                        return (
                            <BluesletterGame key={game.id} game={game} />
                        )
                    })}
                </Flex>
            </Flex>
        </>
    )
}