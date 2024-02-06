import { Divider, Box, Text, Flex } from '@chakra-ui/react'
import Games from './games';

type gameAttributes = {
  id: string;
  title: string;
  icon: string;
  plan: string;
  daysRemaining: number;
}

interface GameListProps {
  title: string;
  games: gameAttributes[];
}

export default function GameList(props: GameListProps) {
  return (
    <>
        <Box>
          <Text fontSize={"20px"} fontWeight={"600"}>{props.title}</Text>
          <Divider />
        </Box>
        <Box alignItems={"center"} paddingBottom={"24px"}>
          {props.games.map((game, index) => {
            return (
              <Games key={index} id={game.id} title={game.title} icon={game.icon} plan={game.plan} daysRemaining={game.daysRemaining} />
            )
          })}
        </Box>
    </>
  )
}