import { Flex, Text, Box, Heading, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NeedAccount() {

    const router = useRouter();
    const [buttonLoading1, setButtonLoading1] = useState(false);
    const [buttonLoading2, setButtonLoading2] = useState(false);
    return (
        <>
            <Box marginTop={"6rem"}>
                <Heading as="h1" display={"flex"} fontWeight={"black"} fontSize={"5xl"} justifyContent={"center"}>Whoops!</Heading>
                <Text display={"flex"} fontSize={"lg"} justifyContent={"center"} textAlign={"center"} padding={"20px"}>You need an account to access this page. Please sign up or sign in using the buttons below!</Text>
                <Flex justifyContent={"center"} gap={"20px"} paddingTop={"40px"}>
                    <Button isLoading={buttonLoading1} onClick={() => {
                        setButtonLoading1(true);
                        router.push("/signup");
                    }}>Sign Up</Button>
                    <Button isLoading={buttonLoading2} variant={"purple"} onClick={() => {
                        setButtonLoading2(true);
                        router.push("/signin");
                    }
                    }>Sign In</Button>
                </Flex>
            </Box>
        </>
    )
}