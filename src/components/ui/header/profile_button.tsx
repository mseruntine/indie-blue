"use client"

import { Avatar, LinkBox, LinkOverlay, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import Tab from './tab';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';

interface ProfileProps {
    username?: string;
    picture?: string;
}

export default function ProfileButton(props: ProfileProps) {
    const router = useRouter();

    function handleSignOut() {
        signOut(auth).then(() => {
            localStorage.setItem("currentUser", "");
            console.log("Signed Out");
            window.location.href = "/";
        }).catch((error) => {
            console.log("An error happened.");
        });
    }

    return (
        <>
            <Menu>
                <MenuButton _hover={{ cursor: "pointer", transform: "scale(1.1)" }}>
                    <Avatar name={props.username} src={props.picture} bg="secondary.600" width={"50px"} height={"50px"}></Avatar>
                </MenuButton>
                {props.username === "" ?
                    <MenuList>
                        <MenuItem onClick={() => {
                            router.push("/signin");
                        }}>
                            <Tab label={"Sign In"} hyperlink={"/signin"}></Tab>
                        </MenuItem>
                        <MenuItem onClick={() => {
                            router.push("/signup");
                        }}>
                            <Tab label={"Sign Up"} hyperlink={"/signup"}></Tab>
                        </MenuItem>
                    </MenuList>
                    : <MenuList>
                        <LinkBox>
                            <MenuItem>
                                <LinkOverlay onClick={(() => {
                                    router.push("/profile");
                                }
                                )}>
                                    <Text fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Profile</Text>
                                </LinkOverlay>
                            </MenuItem>
                        </LinkBox>
                        <LinkBox>
                            <MenuItem>
                                <LinkOverlay onClick={(() => {
                                    handleSignOut();
                                    router.push("/");
                                }
                                )}>
                                    <Text fontSize={"md"} fontWeight="600" color="rgba(255,255,255,0.7)">Sign Out</Text>
                                </LinkOverlay>
                            </MenuItem>
                        </LinkBox>
                    </MenuList>
                }
            </Menu>
        </>
    )
}