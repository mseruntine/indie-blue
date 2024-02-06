"use client"

import { db } from '@/firebase';
import { Box, Button, Flex, Input, Link, Text, Textarea, Select, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'
import { collection, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth, deleteUser, signOut } from "firebase/auth";

export default function Profile() {

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const usersTableRef = collection(db, "userbase");
  const gamesTableRef = collection(db, "games");
  const [profileClicked, setProfileClicked] = useState(true);
  const [bluesletterClicked, setBluesletterClicked] = useState(false);
  const [accessibilityClicked, setAccessibilityClicked] = useState(false);
  const [accountSettingsClicked, setAccountSettingsClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    userid: "",
    username: "",
    picture: "",
    developer: false
  });
  const [currentInput, setCurrentInput] = useState("");
  const [currentBio, setCurrentBio] = useState("");
  const [currentBluesletterPrefs1, setCurrentBluesletterPrefs1] = useState("");
  const [currentBluesletterPrefs2, setCurrentBluesletterPrefs2] = useState("");
  const [currentBluesletterPrefs3, setCurrentBluesletterPrefs3] = useState("");
  const [bluesletterPrefsArray, setBluesletterPrefsArray] = useState(["", "", ""]);
  const [userGames, setUserGames] = useState([]);

  useEffect(() => {
    const getUserData = async (uid: string) => {

      var docRef = doc(usersTableRef, uid);
      var userData = await getDoc(docRef);
  
      currentUser.userid = uid;
      currentUser.username = userData.data()?.username;
      setCurrentInput(userData.data()?.username);
      currentUser.picture = userData.data()?.profile_image;
      currentUser.developer = userData.data()?.developer;
      setCurrentBio(userData.data()?.description);

      if(userData.data()?.bluesletter_preferences !== undefined) {
        setCurrentBluesletterPrefs1(userData.data()?.bluesletter_preferences[0]);
        setCurrentBluesletterPrefs2(userData.data()?.bluesletter_preferences[1]);
        setCurrentBluesletterPrefs3(userData.data()?.bluesletter_preferences[2]);
      }
      setUserGames(userData.data()?.games);
      
      setLoading(false);
    };

    if (localStorage.getItem('currentUser') !== null && localStorage.getItem('currentUser') !== "") {
      getUserData(localStorage.getItem('currentUser')!);
    } else {
      router.push("/signin");
    }
  }, []);

  function settingClicked(linkName: string) {
    if (linkName == "Profile") {
      setProfileClicked(true);
      setBluesletterClicked(false);
      setAccessibilityClicked(false);
      setAccountSettingsClicked(false);
    }
    else if (linkName == "Bluesletter Preferences") {
      setProfileClicked(false);
      setBluesletterClicked(true);
      setAccessibilityClicked(false);
      setAccountSettingsClicked(false);
    }
    else if (linkName == "Accessibility") {
      setProfileClicked(false);
      setBluesletterClicked(false);
      setAccessibilityClicked(true);
      setAccountSettingsClicked(false);
    }
    else if (linkName == "Account Settings") {
      setProfileClicked(false);
      setBluesletterClicked(false);
      setAccessibilityClicked(false);
      setAccountSettingsClicked(true);
    }
  }

  function handleBioChange(event: any) {
    setCurrentBio(event.target.value);
  }

  async function saveProfileData() {

    await setDoc(doc(usersTableRef, currentUser.userid), {
      username: currentInput.trim(),
      description: currentBio.trim()
    }, { merge: true });

    // Refresh page to reflect changes
    window.location.href = ("/profile");

  }

  async function savePreferenceData() {
      
    bluesletterPrefsArray[0] = currentBluesletterPrefs1;
    bluesletterPrefsArray[1] = currentBluesletterPrefs2;
    bluesletterPrefsArray[2] = currentBluesletterPrefs3;

    await setDoc(doc(usersTableRef, currentUser.userid), {
      bluesletter_preferences: bluesletterPrefsArray
    }, { merge: true });

    // Refresh page to reflect changes
    window.location.href = ("/profile");

  }

  function setPref1(event: any) {
    setCurrentBluesletterPrefs1(event.target.value);
  }

  function setPref2 (event: any) {
    setCurrentBluesletterPrefs2(event.target.value);
  }

  function setPref3 (event: any) {
    setCurrentBluesletterPrefs3(event.target.value);
  }

  async function deleteAccount() {

    const auth = getAuth();
    const user = auth.currentUser;

    // Delete games from database
    for (var i = 0; i < userGames.length; i++) {
      await deleteDoc(doc(gamesTableRef, userGames[i]));
    }

    await deleteDoc(doc(usersTableRef, currentUser.userid));

    // Sign out user
    signOut(auth).then(() => {
      localStorage.setItem("currentUser", "");
      window.location.href = "/";
    }).catch((error) => {
      console.log("An error happened: " + error);
    });

    // Delete user from authentication
    await deleteUser(user!);

    // Refresh page to reflect changes
    router.push("/");

  }

  return (
    <>
      <Box padding={"50px 0px"}>
      { loading === false ? 
        <Flex flexDirection="row" gap="30px">
          {/* Side Settings Panel */}
          <Flex flexDirection={"column"} gap="5px" width="300px">
            <Flex background="rgba(255,255,255,0.2)" borderTopRadius={"10px"} height="50px" alignItems="center">
                <Link variant={profileClicked === false ? "side-settings" : "side-settings-clicked"} mx="25px" onClick={() => { settingClicked("Profile"); }}>Profile</Link>
            </Flex>
            <Flex background="rgba(255,255,255,0.2)" height="50px" alignItems="center">
                <Link variant={bluesletterClicked === false ? "side-settings" : "side-settings-clicked"} mx="25px" onClick={() => { settingClicked("Bluesletter Preferences"); }}>Bluesletter Preferences</Link>
            </Flex>
            <Flex background="rgba(255,255,255,0.2)" height="50px" alignItems="center">
                <Link variant={accessibilityClicked === false ? "side-settings" : "side-settings-clicked"} mx="25px" onClick={() => { settingClicked("Accessibility"); }}>Accessibility</Link> 
            </Flex>
            <Flex background="rgba(255,255,255,0.2)" borderBottomRadius="10px" height="50px" alignItems="center">
                <Link variant={accountSettingsClicked === false ? "side-settings" : "side-settings-clicked"} mx="25px" onClick={() => { settingClicked("Account Settings"); }}>Account Settings</Link>
            </Flex>
          </Flex>
          {/* Main Content Panel */}
          <Flex>
            <Box width="700px" backgroundColor="#FFFFFF34" borderWidth={"2px"} borderRadius={"10px"}>
              {/* Profile Tab */}
              {profileClicked == true ?
                <Flex flexDirection={"column"}>
                  <Flex my="15px" justifyContent="center" alignItems={"center"}>
                    <Text fontSize='2xl' fontWeight="700">Profile</Text>
                  </Flex>
                  <Flex flexDirection={"column"} mx="50px" my="25px" gap="50px">
                    <Flex flexDirection={"column"} gap="5px">
                      <Text fontWeight={"700"}>Username</Text>
                      <Input id="username-input" width="300px" borderWidth={"2px"} borderRadius={"10px"} placeholder="" background="rgba(255,255,255,0.2)" variant="filled" value={currentInput}
                      onChange={(event) => {
                        setCurrentInput(event.target.value);
                      }}></Input>
                    </Flex>
                    <Flex flexDirection={"column"} gap="5px">
                      <Text fontWeight={"700"}>Avatar</Text>
                      <Flex flexDirection={"row"} gap="25px">
                        <Avatar src={currentUser.picture} name={currentUser.username} bg="secondary.600"></Avatar>
                        <Flex flexDirection={"row"} alignContent={"center"} gap="5px">
                          <Button width="100px" variant={"red"}>Upload</Button>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex flexDirection={"column"} gap="5px">
                      <Text fontWeight={"700"}>Bio</Text>
                      <Textarea width="300px" height="200px" borderWidth={"2px"} borderRadius={"10px"} placeholder="" background="rgba(255,255,255,0.2)" resize="none" value={currentBio} onChange={handleBioChange} /> 
                    </Flex>
                    <Flex justifyContent={"flex-end"}>
                      <Button isLoading={buttonLoading} width="150px" variant="purple" onClick={() => {
                        setButtonLoading(true);
                        saveProfileData();
                      }}> Save Changes </Button>
                    </Flex>
                  </Flex>
                </Flex> : null}
              {/* Bluesletter Preferences Tab */}
              {bluesletterClicked == true ?
                <Flex flexDirection={"column"}>
                  <Flex my="15px" justifyContent="center" alignItems={"center"}>
                    <Text fontSize='2xl' fontWeight="700">Bluesletter Preferences</Text>
                  </Flex>
                  <Flex flexDirection={"column"} mx="50px" my="25px" gap="50px">
                    <Flex flexDirection="column" gap="10px">
                      <Text fontWeight={"700"}>Preferred Game Genre 1</Text>
                      <Select placeholder="Select a genre" value={currentBluesletterPrefs1} onChange={setPref1}>
                        <option value="action" style={{ background: "#2D3748" }}>Action</option>
                        <option value="adventure" style={{ background: "#2D3748" }}>Adventure</option>
                        <option value="arcade" style={{ background: "#2D3748" }}>Arcade</option>
                        <option value="casino" style={{ background: "#2D3748" }}>Casino</option>
                        <option value="casual" style={{ background: "#2D3748" }}>Casual</option>
                        <option value="fantasy" style={{ background: "#2D3748" }}>Fantasy</option>
                        <option value="multiplayer" style={{ background: "#2D3748" }}>Multiplayer</option>
                        <option value="platformer" style={{ background: "#2D3748" }}>Platformer</option>
                        <option value="puzzle" style={{ background: "#2D3748" }}>Puzzle</option>
                        <option value="racing" style={{ background: "#2D3748" }}>Racing</option>
                        <option value="rpg" style={{ background: "#2D3748" }}>RPG</option>
                        <option value="sandbox" style={{ background: "#2D3748" }}>Sandbox</option>
                        <option value="simulation" style={{ background: "#2D3748" }}>Simulation</option>
                        <option value="singleplayer" style={{ background: "#2D3748" }}>Singleplayer</option>
                        <option value="sports" style={{ background: "#2D3748" }}>Sports</option>
                        <option value="strategy" style={{ background: "#2D3748" }}>Strategy</option>
                        <option value="survival" style={{ background: "#2D3748" }}>Survival</option>
                      </Select>
                    </Flex>
                    <Flex flexDirection="column" gap="10px">
                      <Text fontWeight={"700"}>Preferred Game Genre 2</Text>
                      <Select placeholder="Select a genre" value={currentBluesletterPrefs2} onChange={setPref2}>
                        <option value="action" style={{ background: "#2D3748" }}>Action</option>
                        <option value="adventure" style={{ background: "#2D3748" }}>Adventure</option>
                        <option value="arcade" style={{ background: "#2D3748" }}>Arcade</option>
                        <option value="casino" style={{ background: "#2D3748" }}>Casino</option>
                        <option value="casual" style={{ background: "#2D3748" }}>Casual</option>
                        <option value="fantasy" style={{ background: "#2D3748" }}>Fantasy</option>
                        <option value="multiplayer" style={{ background: "#2D3748" }}>Multiplayer</option>
                        <option value="platformer" style={{ background: "#2D3748" }}>Platformer</option>
                        <option value="puzzle" style={{ background: "#2D3748" }}>Puzzle</option>
                        <option value="racing" style={{ background: "#2D3748" }}>Racing</option>
                        <option value="rpg" style={{ background: "#2D3748" }}>RPG</option>
                        <option value="sandbox" style={{ background: "#2D3748" }}>Sandbox</option>
                        <option value="simulation" style={{ background: "#2D3748" }}>Simulation</option>
                        <option value="singleplayer" style={{ background: "#2D3748" }}>Singleplayer</option>
                        <option value="sports" style={{ background: "#2D3748" }}>Sports</option>
                        <option value="strategy" style={{ background: "#2D3748" }}>Strategy</option>
                        <option value="survival" style={{ background: "#2D3748" }}>Survival</option>
                      </Select>
                    </Flex>
                    <Flex flexDirection="column" gap="10px">
                      <Text fontWeight={"700"}>Preferred Game Genre 3</Text>
                      <Select placeholder="Select a genre" value={currentBluesletterPrefs3} onChange={setPref3}>
                        <option value="action" style={{ background: "#2D3748" }}>Action</option>
                        <option value="adventure" style={{ background: "#2D3748" }}>Adventure</option>
                        <option value="arcade" style={{ background: "#2D3748" }}>Arcade</option>
                        <option value="casino" style={{ background: "#2D3748" }}>Casino</option>
                        <option value="casual" style={{ background: "#2D3748" }}>Casual</option>
                        <option value="fantasy" style={{ background: "#2D3748" }}>Fantasy</option>
                        <option value="multiplayer" style={{ background: "#2D3748" }}>Multiplayer</option>
                        <option value="platformer" style={{ background: "#2D3748" }}>Platformer</option>
                        <option value="puzzle" style={{ background: "#2D3748" }}>Puzzle</option>
                        <option value="racing" style={{ background: "#2D3748" }}>Racing</option>
                        <option value="rpg" style={{ background: "#2D3748" }}>RPG</option>
                        <option value="sandbox" style={{ background: "#2D3748" }}>Sandbox</option>
                        <option value="simulation" style={{ background: "#2D3748" }}>Simulation</option>
                        <option value="singleplayer" style={{ background: "#2D3748" }}>Singleplayer</option>
                        <option value="sports" style={{ background: "#2D3748" }}>Sports</option>
                        <option value="strategy" style={{ background: "#2D3748" }}>Strategy</option>
                        <option value="survival" style={{ background: "#2D3748" }}>Survival</option>
                      </Select>
                    </Flex>
                    <Flex justifyContent={"flex-end"}>
                      <Button isLoading={buttonLoading} width="150px" variant="purple" onClick={() => {
                        setButtonLoading(true);
                        savePreferenceData();
                      }}> Save Changes </Button>
                    </Flex>
                  </Flex>
                </Flex>
                : null}
              {/* Accessibility Tab */}
              {accessibilityClicked == true ?
                <Flex flexDirection={"column"}>
                  <Flex my="15px" flexDirection="column" justifyContent="center" alignItems={"center"}>
                    <Text fontSize='2xl' fontWeight="700">Accessibility</Text>
                    <Text my="8px">Accessibility settings are in development.</Text>
                  </Flex>
                </Flex>
                : null}
              {/* Account Settings Tab */}
              {accountSettingsClicked == true ?
                <Flex flexDirection={"column"}>
                  <Flex my="15px" flexDirection="column" justifyContent="center" alignItems={"center"}>
                    <Text fontSize='2xl' fontWeight="700">Account Settings</Text>
                    <Text my="8px">Additional account settings in development.</Text>
                  </Flex>
                  <Flex flexDirection={"column"} m="20px 50px" gap="8px">
                    <Button onClick={onOpen} w="40%" bgColor="#CC0000">Delete Account</Button>
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Delete Account</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            You are about to delete your account. This action <b>cannot be reversed.</b> Do you wish to continue?
                          </ModalBody>

                          <ModalFooter>
                            <Button colorScheme='blue' mr={3} bgColor="#CC0000" onClick={deleteAccount}>
                              Delete Account
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Go Back</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                      <Text color="#FFFFFF88" fontSize="14px" ml="4px" mb="16px">(This action is irreversible.)</Text>
                  </Flex>
                </Flex>
                : null}
            </Box>
          </Flex>
        </Flex> : null }
      </Box> 
    </>
  )
}