import { Text, Flex } from '@chakra-ui/react'

interface StatisticProps {
  name: string;
  number: number;
  toFixed?: boolean;
}

export default function Statistics(props: StatisticProps) {
  return (
    <>
        <Flex direction={"row"} justifyContent={"space-between"} marginBottom={"5px"}>
            <Text fontSize={"18px"} fontWeight={"700"}>{props.name}</Text>
            <Text fontSize={"18px"} fontWeight={"700"}>{props.toFixed ? props.number.toFixed(2) : props.number}</Text>    
        </Flex>      
    </>
  )
}