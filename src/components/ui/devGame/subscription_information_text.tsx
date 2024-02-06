import { Flex, Text, } from '@chakra-ui/react'

interface SubscriptionInformationProps {
  id: string,  
  title: string
  data: string
}

export default function SubscriptionInformationText(props: SubscriptionInformationProps) {
  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
         <Text fontSize={"16px"} fontWeight={"600"} color={"rgba(255,255,255,0.5)"}>{props.title}</Text>
         <Text id={props.id} fontSize={"22px"} fontWeight={"600"} color={"rgb(255,255,255)"}>{props.data}</Text>
      </Flex>
    </>
  )
}