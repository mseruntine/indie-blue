import { Flex } from '@chakra-ui/react'
import SubscriptionInformation from './subscription_information'
import AppIcon from './app_icon'
import HeroImage from './hero_image'
import PreviewImages from './preview_images'
import { useEffect, useRef, useState } from 'react'
import { db } from '@/firebase'
import { useCurrentGame } from '@/hooks/useCurrentGame'
import { collection, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'


export default function RightSection() {

  const router = useRouter();
  const currentGame = useCurrentGame();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const gamesTableRef = collection(db, "games");

  const [currentSubscriptionPlan, setCurrentSubscriptionPlan] = useState("Unselected Plan");
  const [blueslettersThisCycle, setBlueslettersThisCycle] = useState("0");
  const [totalBluesletters, setTotalBluesletters] = useState("0");
  const [daysRemaining, setDaysRemaining] = useState("30");
  const [viewsThisCycle, setViewsThisCycle] = useState("0");
  const [viewsTotal, setViewsTotal] = useState("0");
  const [icon, setIcon] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [descImg1, setDescImg1] = useState("");
  const [descImg2, setDescImg2] = useState("");
  const [descImg3, setDescImg3] = useState("");
  const [descImg4, setDescImg4] = useState("");
  const [descImg5, setDescImg5] = useState("");
  const [descImg6, setDescImg6] = useState("");

  var subscriptionInformationProps = useRef({
    currentSubscriptionPlan: currentSubscriptionPlan,
    blueslettersThisCycle: blueslettersThisCycle,
    totalBluesletters: totalBluesletters,
    daysRemaining: daysRemaining,
    viewsThisCycle: viewsThisCycle,
    totalViews: viewsTotal,
  });
  var previewImages : string[] = [descImg1, descImg2, descImg3, descImg4, descImg5, descImg6];

  const getGameData = async (id: string) => {

    try {

      var docRef = doc(gamesTableRef, id);
      var gameData = await getDoc(docRef);
      console.log(gameData.data());
        
      subscriptionInformationProps.current.currentSubscriptionPlan = currentGame.currentGame.paymentPlanName !== "Unselected Plan" ? currentGame.currentGame.paymentPlanName : gameData.data()!.subscriptions;
      subscriptionInformationProps.current.blueslettersThisCycle = gameData.data()!.letters_distributed_cycle ? gameData.data()!.letters_distributed_cycle : "0";
      subscriptionInformationProps.current.totalBluesletters = gameData.data()!.letters_distributed_total ? gameData.data()!.letters_distributed_total : "0";
      subscriptionInformationProps.current.daysRemaining = gameData.data()!.days_remaining ? gameData.data()!.days_remaining : "0";
      subscriptionInformationProps.current.viewsThisCycle = gameData.data()!.game_views_cycle ? gameData.data()!.game_views_cycle : "0";
      subscriptionInformationProps.current.totalViews = gameData.data()!.game_views_total ? gameData.data()!.game_views_total : "0";

      setIcon(gameData.data()!.icon);
      setHeroImage(gameData.data()!.hero);
      
      setDescImg1(gameData.data()!.preview_images[0]);
      setDescImg2(gameData.data()!.preview_images[1]);
      setDescImg3(gameData.data()!.preview_images[2]);
      setDescImg4(gameData.data()!.preview_images[3]);
      setDescImg5(gameData.data()!.preview_images[4]);
      setDescImg6(gameData.data()!.preview_images[5]);
      
      setLoading(false);

    } catch (error) {

      console.log(error)
      setError(true);
      setLoading(false);

    }

  }

  useEffect(() => {
    if (currentGame.currentGame.gameID !== "") {
      getGameData(currentGame.currentGame.gameID);
    }
    else {
      setLoading(false);
    }

  }, [])

  return (
    <>
      {loading === false ? 
        <Flex direction={"column"} gap={"15px"}>
        <SubscriptionInformation options={subscriptionInformationProps.current} />
        <AppIcon prefilledAppIcon={icon} />
        <HeroImage prefilledHeroImage={heroImage} />
        <PreviewImages prefilledDescImages={previewImages}/>
      </Flex> : null}
    </>
  )
}