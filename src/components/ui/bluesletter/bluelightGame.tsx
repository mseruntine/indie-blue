import { Flex, Text, Image, Grid, GridItem } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface BluelightGameProps {
    bluelightID: string;
    bluelightHero: string;
    bluelightIcon: string;
    bluelightTitle: string;
    bluelightPublisher: string;
    bluelightGenre: string;
    bluelightDesc: string;
}

export default function BluelightGame(props: BluelightGameProps) {

    const router = useRouter();
    return (
        <>
            <Flex direction="column" w="100%" mt="50px">
                <Text fontSize="24px" fontWeight="700" mr="auto" pl="16px">Bluelight</Text>
                <Flex direction="row" maxW="100%" p="16px" borderRadius="16px" transition={"all 0.2s ease-in-out"} _hover={{ cursor: "pointer", bgColor: "primary.600", transform: "scale(1.01)", marginTop: "3px" }} onClick={() => {router.push("/game")}}>
                    <Image src={props.bluelightHero} w="calc(100% - 364px)" objectFit="cover" alt='Hero Image' borderRadius="13px" aspectRatio={16 / 9}/>
                    <Flex direction="column" ml="24px" w="340px">
                        <Image src={props.bluelightIcon} objectFit="cover" alt="Icon Image" aspectRatio={1 / 1} borderRadius="13px" w="108px" mb="13px" />
                        <Text fontSize="32px" fontWeight="700" isTruncated>{props.bluelightTitle}</Text>
                        <Text fontSize="20px" fontWeight="400" mt="-3px" isTruncated>{props.bluelightPublisher}</Text>
                        <Text fontSize="16px" fontWeight="400" color="#FFFFFF88" isTruncated>{props.bluelightGenre}</Text>
                        <Text fontSize="16px" fontWeight="400" overflowY="hidden" maxH="512px" noOfLines={8} pt="8px">{props.bluelightDesc}</Text>
                    </Flex>
                </Flex>
            </ Flex>
        </>
    )
}