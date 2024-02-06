"use client"

import { useCurrentGame } from '@/hooks/useCurrentGame';
import { Text, Flex, Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';

interface PlanProps {
    title: string;
    price: string;
    blueslettersperMonth?: string;
    color: string;
    mostPopular?: boolean;
    mostPopularColor?: string;
}

export default function Plan(props: PlanProps) {
    const router = useRouter();
    const selectedPlan = useCurrentGame();

    return (
        <>
            <Flex direction="column" alignItems={"center"} onClick={() => {
                selectedPlan.currentGame.paymentPlanName = props.title;
                selectedPlan.currentGame.paymentPlanPrice = props.price;
                router.push("/developerDashboard/devGame/planSelection/payment");
            }}>
                <Box bg={props.color} borderRadius="10px" padding={"30px"} width={"300px"} height={"415px"} transition={"all 0.2s ease-in-out"} _hover={{ transform: "scale(1.05)", cursor: "pointer" }}>
                    <Heading fontSize={"3xl"} textAlign="center" paddingBottom={"20px"}>{props.title}</Heading>
                    <Heading textAlign="center" fontWeight={"400"} fontStyle={"italic"}>{props.price}</Heading>
                    <Text color={"rgba(255,255,255,0.5)"} textAlign="center" fontStyle={"italic"} paddingBottom="10px">per month</Text>
                    <UnorderedList textAlign="left" marginBottom={"15px"} px="5px">
                        <ListItem fontSize={"16px"}>Featured on IndieBlue</ListItem>
                        <ListItem fontSize={"16px"}>Accessible via search</ListItem>
                        <ListItem fontSize={"16px"}>Eligible for inclusion in the <b>Bluesletter</b></ListItem>
                        <ListItem fontSize={"16px"}>Access to interaction statistics</ListItem>
                        {props.blueslettersperMonth != null ?
                            <ListItem fontSize={"16px"} fontStyle={"italic"}>Guaranteed inclusion in at least <b>{props.blueslettersperMonth}</b> Bluesletters per month.</ListItem> : null}
                    </UnorderedList>
                    <Flex justifyContent={"center"}>
                        {props.mostPopular ? <Box bg={props.mostPopularColor} color={"rgb(255,255,255)"} borderRadius="10px" width="120px" height="36px" fontSize={"16px"} textAlign={"center"}>
                            <Text marginTop={"5px"}>Most Popular</Text>
                        </Box> : null}
                    </Flex>
                </Box>

            </Flex>

        </>
    )
}