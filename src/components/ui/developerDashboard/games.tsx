"use client"

import { useCurrentGame } from '@/hooks/useCurrentGame';
import { Text, Flex, Image, Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface GameProps {
  id: string;
  title: string;
  icon: string;
  plan: string;
  daysRemaining: number;
}


export default function Games(props: GameProps) {
  
  const gameSelected = useCurrentGame();
  const router = useRouter();
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <>
      <Flex direction={"row"} paddingTop={"25px"} paddingBottom={"8px"} justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={"22px"}>
          <Image w={"87px"} h={"87px"} borderRadius={"10px"} src={props.icon} alt='Game Logo'></Image>
          <Flex direction={"column"} justifyContent={"space-around"}>
            <Text fontSize={"22px"} fontWeight={"700"} maxWidth={"275px"} noOfLines={1}>{props.title}</Text>
          </Flex>
        </Flex>
        <Flex gap={"16px"}>
            <Flex textAlign={"right"} direction={"column"}>
                <Text fontSize={"12px"} fontWeight={"600"}>{props.plan}</Text>
                <Text fontSize={"12px"} fontWeight={"600"}>Expires in {props.daysRemaining} days</Text>
            </Flex>
                <Button isLoading={buttonLoading} variant={"red"} onClick={() => {
                  setButtonLoading(true);
                  gameSelected.currentGame.gameName = props.title;
                  gameSelected.currentGame.gameID = props.id;
                  router.push("/developerDashboard/devGame");
                  }}>Manage</Button>
        </Flex>
      </Flex>
    </>
  )
}