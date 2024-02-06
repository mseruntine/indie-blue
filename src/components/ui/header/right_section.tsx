"use client"

import { Flex } from '@chakra-ui/react'
import Tab from './tab';
import ProfileButton from './profile_button';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useEffect, useState } from 'react';

const usersTableRef = collection(db, "userbase");


export default function RightSection() {
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState({
    username: "",
    picture: "",
    developer: false
  });

  useEffect(() => {
    const getUserData = async (uid: string) => {

      var docRef = doc(usersTableRef, uid);
      var userData = await getDoc(docRef);

      currentUser.username = userData.data()?.username;
      currentUser.picture = userData.data()?.profile_image;
      currentUser.developer = userData.data()?.developer;
      
      setLoading(false);
    };

    if (localStorage.getItem('currentUser') !== null && localStorage.getItem('currentUser') !== "") {
      getUserData(localStorage.getItem('currentUser')!);
    }
    else {
      setLoading(false);
    }
    
  }, [currentUser]);

  return (
    <>
      { loading === false ? <Flex direction="row" justifyContent="right" alignItems={"center"} gap={"50px"}>
            { currentUser.developer === true ? <Tab label={"Developer Dashboard"} hyperlink={"/developerDashboard"}></Tab> : null}
            <ProfileButton username={currentUser.username} picture={currentUser.picture}/>
      </Flex> : null}
    </>
  )
}