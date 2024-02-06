"use client"

import { Box, Button, Divider, Flex, Grid, GridItem, Input, InputGroup, Menu, MenuButton, MenuList, MenuItem, Text, Select, InputLeftElement } from '@chakra-ui/react'
import GameGrid from '@/components/ui/explore/gameGrid'
import React, { useEffect } from 'react';
import { db } from '../../firebase';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaSearch } from "react-icons/fa";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export default function Explore() {

  type gameAttributes = {
    title: string;
    icon: string;
    hero: string;
    developer: any;
    genre: string;
    id: string;
  }

  const [gamesToDisplay, setGamesToDisplay] = React.useState<gameAttributes[]>([]);
  const gamesTableRef = collection(db, "games");
  const userDBName = "userbase";
  const usersTableRef = collection(db, userDBName);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {

    const getDevUsername = async (uid: string) => {

      var username;

      try {

        var docRef = doc(usersTableRef, uid);
        var devData = await getDoc(docRef);
        // console.log(devData.data()!.username);
        username = devData.data()!.username;

      } catch (error) {

        console.log(error)
        setError(true);
        setLoading(false);

      }

      return username;

    }

    const loadGames = async () => {

      try {

        const querySnapshot = await getDocs(gamesTableRef);
        var tempGames: gameAttributes[] = [];

        querySnapshot.forEach(game => {

          var gameData = game.data();
          console.log(game.data());

          if (gameData.active_status === 1) {
            var devID = gameData.developer_id;
            var devName = getDevUsername(devID);
  
            var genreString = "";
              var genreArray = gameData.genre;
              for (var i = 0; i < genreArray.length; i++) {
                  genreString += genreArray[i];
                  if (i != genreArray.length - 1) {
                      genreString += ", ";
                  }
              }
  
            var temp = {
              title: gameData.name,
              icon: gameData.icon,
              hero: gameData.hero,
              developer: devName,
              genre: genreString,
              id: gameData.uid
            };
  
            // console.log(temp);
            tempGames.push(temp);
          }

        });

        setGamesToDisplay(tempGames);
        
        console.log(gamesToDisplay);

        setLoading(false);

      } catch (error) {

        console.log(error);
        setError(true);
        setLoading(false);

      }

      setLoading(false);
  
    };

    loadGames();

  }, []);

  return (
    <>
      {loading ? null : <Grid
        templateAreas={`"heading1 heading2" 
                        "games filters"`}
        templateColumns="3fr 1fr"
        paddingTop={"50px"}
        columnGap="32px">
        <GridItem marginBottom={4} area={"heading1"}>
          <Flex alignItems="center">
            <Text width="70px" fontWeight="600">
              Sort by:
            </Text>
            <Select background="#2D3748" width="150px">
              <option style={{background: "#2D3748"}} value='option0'>Most Popular</option>
              <option style={{background: "#2D3748"}} value='option1'>Newest</option>
              <option style={{background: "#2D3748"}} value='option2'>Trending</option>
            </Select>
          </Flex>
        </GridItem>
        <GridItem marginBottom={4} area={"heading2"}>
          <Flex paddingTop="13px">
            <Text width="70px" fontWeight="600">
              Filters
            </Text>
          </Flex>
        </GridItem>
        <GridItem area={"games"}>
          <GameGrid title={"Active Games"} games={gamesToDisplay} />
        </GridItem>
        <GridItem display="flex" flexDirection={"column"} area={"filters"}>
          <Box borderWidth='2px' borderRadius='lg' borderColor='#FFFFFF34' p='6' w='100%' color='white'>
            <InputGroup>
              <InputLeftElement>
                <FaSearch />
              </InputLeftElement>
              <Input type="text" placeholder="Search..." _placeholder={{ textColor:"white" }} textColor="white" bgColor="#FFFFFF34" border="none" mb="20px" />
            </InputGroup>
            <Flex flexDirection={"column"}>
            <Divider w="100%" my="10px" />
              <Menu>
                <MenuButton as={Button} backgroundColor={"transparent"} variant="" rightIcon={<ChevronDownIcon />}>
                  <Text textAlign={"left"} fontWeight="400">Genre</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option1</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option2</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option3</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option4</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option5</MenuItem>
                </MenuList>
              </Menu>
              <Divider w="100%" my="10px" />
              <Menu>
                <MenuButton as={Button} backgroundColor={"transparent"} variant="" rightIcon={<ChevronDownIcon />}>
                <Text textAlign={"left"} fontWeight="400">Platform</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option1</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option2</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option3</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option4</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option5</MenuItem>
                </MenuList>
              </Menu>
              <Divider w="100%" my="10px" />
              <Menu>
                <MenuButton as={Button} backgroundColor={"transparent"} variant="" rightIcon={<ChevronDownIcon />}>
                <Text textAlign={"left"} fontWeight="400">Rating</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option1</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option2</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option3</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option4</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option5</MenuItem>
                </MenuList>
              </Menu>
              <Divider w="100%" my="10px" />
              <Menu>
                <MenuButton as={Button} backgroundColor={"transparent"} variant="" rightIcon={<ChevronDownIcon />}>
                <Text textAlign={"left"} fontWeight="400">Multiplayer</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option1</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option2</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option3</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option4</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option5</MenuItem>
                </MenuList>
              </Menu>
              <Divider w="100%" my="10px" />
              <Menu>
                <MenuButton as={Button} backgroundColor={"transparent"} variant="" rightIcon={<ChevronDownIcon />} >
                <Text textAlign={"left"} fontWeight="400">Release Date</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option1</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option2</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option3</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option4</MenuItem>
                  <MenuItem fontSize="md" fontWeight="600" color="rgba(255,255,255,0.7)">Option5</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </GridItem>
      </Grid>}
      {loading ? null : <Flex display="center" height="100px">
        <Text>Pagination coming soon</Text>
      </Flex>}
    </>
  )
}
