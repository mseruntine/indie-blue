import { Box, Grid } from '@chakra-ui/react'
import GameCard from './gameCard';

type gameAttributes = {
    title: string;
    icon: string;
    hero: string;
    developer: string;
    genre: string;
    id: string;
}

// This is unused in the current build, but if we decide to use this string value, this originally populated
// the name of the entire list of games above the grid. (Like newest games, action games, popular games, etc)
interface GameGridProps {
    title: string;
    games: gameAttributes[];
}

// This function takes any games that have been manually inputted into the explore page, 
// and generates them in a list, which is formatted into a grid dynamically. Have not been 
// able to implement the case for if the number of games overrides the max amount allowed on
// a single page (which is going to be implemented to be a max of 12). Once pagination gets
// built we'll have to figure that out. 
export default function GameGrid(props: GameGridProps) {
    return (
        <>
            <Box alignItems={"center"} paddingBottom={"24px"}>
                <Grid
                    templateColumns='repeat(3, 1fr)'
                    templateRows='repeat(4, 1fr)'
                    columnGap='8px'
                    rowGap='16px' 
                >
                    {props.games.map((game, index) => {
                        return (
                            <GameCard key={index} title={game.title} icon={game.icon} hero={game.hero} developer={game.developer} genre={game.genre} id={game.id} />
                        )
                    })}

                </Grid>
            </Box>
        </>
    )
}