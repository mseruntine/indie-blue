import { Flex, Text, Collapse, Button, HStack, Divider } from "@chakra-ui/react";
import GameCarousel from "./gameCarousel";
import GameReviews from "./gameReviews";
import { useState } from 'react';
import Reviews from "./reviews";

type review = {
    name:string;
    rating:number;
    reviewText:string;
}

interface GameBodyProps
{
    heroImage: string;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: string;
    desc: string;
    genre: string;
    reviews: review[];
}

export default function GameBody(props:GameBodyProps) {

    const [showDesc, setShowDesc] = useState(false);
    const handleToggle = () => setShowDesc(!showDesc);

    console.log(props.reviews);

    return (
        <>
            <GameCarousel
            heroImage={props.heroImage}
            image1={props.image1}
            image2={props.image2}
            image3={props.image3}
            image4={props.image4}
            image5={props.image5}
            image6={props.image6}
            />
            <Flex flexDir="column" >
                <Flex pt="24px" w="100%" >
                    <Collapse startingHeight="60px" in={showDesc}>
                        <Text fontSize="20px">{props.desc}</Text>
                    </Collapse>
                </Flex>
                <Button variant="unstyled" onClick={handleToggle} ml="auto" fontSize="16px" fontWeight="400" color="#FFFFFF88">
                    Show {showDesc ? "Less" : "More"}
                </Button>
                <HStack>
                    <Text fontSize="16px" color="#FFFFFF88">Genre: </Text>
                    <Text fontSize="16px">{props.genre}</Text>
                </HStack>
                <Divider margin="20px 0" />
                <Reviews reviews={props.reviews} />
            </Flex>
            <GameReviews />
        </>
    )
}