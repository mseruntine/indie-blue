import { Button, Flex, HStack, Text, Divider, LinkBox, LinkOverlay } from "@chakra-ui/react";

interface GameAlternateProps
{
    developer: string,
    releaseDate: string,
    listingDate: string,
    lastUpdated: string,
    platforms: string,
    iOSLink: string,
    GPSLink: string,
    ageRating: string
}


export default function GameAlternate(props:GameAlternateProps) {
    return (
        <>
            <Flex flexDirection="column">
                {props.iOSLink != "" ?
                    <LinkBox mb="20px">
                        <LinkOverlay href={props.iOSLink} target="_blank">
                            <Button w="100%" fontSize="20px" p="34px" borderRadius="12px">iOS App Store</Button>
                        </LinkOverlay>
                    </LinkBox>
                : null}
                {props.GPSLink != "" ?
                    <LinkBox mb="20px">
                        <LinkOverlay href={props.GPSLink} target="_blank">
                            <Button w="100%" fontSize="20px" p="34px" borderRadius="12px" variant="purple">Google Play Store</Button>
                        </ LinkOverlay>
                    </ LinkBox>
                 : null}
                <HStack mt="20px">
                    <Text color="#FFFFFF88" fontSize="16px">Developer</Text>
                    <Text ml="auto">{props.developer}</Text>
                </HStack>
                <Divider m="16px 0" />
                <HStack>
                    <Text color="#FFFFFF88">Release Date</Text>
                    <Text ml="auto">{props.releaseDate}</Text>
                </HStack>
                <Divider m="16px 0" />
                <HStack>
                    <Text color="#FFFFFF88">Listing Date</Text>
                    <Text ml="auto">{props.listingDate}</Text>
                </HStack>
                <Divider m="16px 0" />
                <HStack>
                    <Text color="#FFFFFF88">Last Updated</Text>
                    <Text ml="auto">{props.lastUpdated}</Text>
                </HStack>
                <Divider m="16px 0" />
                <HStack>
                    <Text color="#FFFFFF88" fontSize="16px">Age Rating</Text>
                    <Text ml="auto">{props.ageRating}</Text>
                </HStack>
                <Divider m="16px 0" />
                <HStack>
                    <Text color="#FFFFFF88">Platforms</Text>
                    <Text ml="auto">{props.platforms}</Text>
                </HStack>
            </Flex>
            
        </>
    )
}