import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import Review from "./review";


type review = {
    name:string;
    rating:number;
    reviewText:string;
}

interface ReviewsProps{
    reviews: review[];
}

export default function Reviews(props:ReviewsProps) {

    
    return (
        <>
            <Flex flexDirection="column" w="100%">
                <Text fontSize="24px" fontWeight="600" mr="auto" pb="8px">Reviews</Text>
                <Textarea placeholder="Leave a review..." w="100%" h="120px" background={"#FFFFFF34"}
                      _hover={{ background:"#FFFFFF24" }} _focusVisible={{ background:"#FFFFFF00", borderColor:"#63b3ed"}} resize="none"/>
                <Button variant="purple" mt="8px" w="140px" ml="auto">Submit</Button>
                <Flex direction="column" px="16px">
                    {props.reviews.map((review, index) => {
                        return (
                            <Review key={index} name={review.name} rating={review.rating} reviewText={review.reviewText} />
                        )
                    })}
                </Flex>
            </Flex>
        </>
    )
}