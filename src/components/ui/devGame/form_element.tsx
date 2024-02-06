import { useCurrentGame } from '@/hooks/useCurrentGame';
import { Flex, Text, Input, } from '@chakra-ui/react'
import { use, useState } from 'react';

interface FormElementProps {
    id: string;
    title: string;
    gameName?: boolean;
    prefilled?: string;
    placeholder?: string;
    customWidth?: string;
    customHeight?: string;
}

export default function FormElement(props: FormElementProps) {
  const currentGame = useCurrentGame();
  const [currentInput, setCurrentInput] = useState(props.prefilled);
  
  return (
    <>
      <Flex direction={"column"} gap={"5px"}>
          <Text fontWeight={"600"} fontSize={"18px"}>{props.title}</Text>
          <Input  
            id={props.id}
            placeholder={props.placeholder} 
            width={props.customWidth} 
            height={props.customHeight} 
            background={"rgba(255,255,255,0.2)"} 
            variant={"filled"} 
            mb={6}
            onChange={(event) => {
              props.gameName ? currentGame.currentGame.gameName = event.target.value : null;
              setCurrentInput(event.target.value);
            }}
            value={currentInput}
          />
      </Flex>
    </>
  )
}