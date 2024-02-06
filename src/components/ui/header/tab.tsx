"use client"

import { LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";


interface TabProps {
    label: string;
    hyperlink: string;
}

export default function Tab(props: TabProps) {
    const router = useRouter();

    return (
        <>
            <LinkBox transition={"all 0.2s ease-in-out"} _hover={{ cursor: "pointer", transform: "scale(1.05)" }} data-group >
                <LinkOverlay href={props.hyperlink}>
                    <Text
                    fontSize="md"
                    fontWeight="600"
                    color="rgba(255,255,255,0.7)"
                    _groupHover={{
                        shadow: 'md',
                        color: 'white',
                        transitionDuration: '0.2s',
                        transitionTimingFunction: "ease-in-out"
                        }}
                    >
                        {props.label}
                    </Text>
                </LinkOverlay>
            </LinkBox>
        </>
    )
}