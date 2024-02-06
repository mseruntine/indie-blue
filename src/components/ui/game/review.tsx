import { Flex, Icon, Text } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { IoStar, IoStarHalf } from "react-icons/io5";


interface ReviewProps {
    name:string;
    rating:number;
    reviewText:string;
}


export default function Review(props:ReviewProps) {

    let numOfStars = Math.floor(props.rating);
    let halfStar = props.rating % 1 != 0 ? true : false;

    var stars = [];
    for(var i = 0; i < numOfStars; i++) { stars.push(<Icon as={IoStar} color="#CA2E55" w="24px" h="24px" />); }
    if(halfStar) { stars.push(<Icon as={IoStarHalf} color="#CA2E55" w="24px" h="24px" />); }

    return (
        <>
        <Flex flexDir="column" w="100%" pb="32px">
            <Text fontWeight={"600"} fontSize="24px" mr="auto">{props.name}</Text>
            <Flex gap="6px" pt="4px" pb="6px">{stars}</Flex>
            <Text>{props.reviewText}</Text>
        </Flex>
        </>
    )
}