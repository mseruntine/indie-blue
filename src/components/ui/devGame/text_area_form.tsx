import { Flex, Text, Textarea, } from '@chakra-ui/react'
import { useState } from 'react';

interface TextAreaFormProps {
  id: string;
  title: string;
  prefilled?: string;
  placeholder?: string;
  customWidth?: string;
  customHeight?: string;
}

export default function TextAreaForm(props: TextAreaFormProps) {
  const [currentInput, setCurrentInput] = useState(props.prefilled ? props.prefilled : "");

  return (
    <>
      <Flex direction={"column"} gap={"5px"}>
        <Text fontWeight={"600"} fontSize={"18px"}>{props.title}</Text>
        <Textarea 
          id={props.id}
          placeholder={props.placeholder}
          width={props.customWidth}
          height={props.customHeight}
          background={"rgba(255,255,255,0.2)"}
          mb={6}
          _hover={{ background: "rgba(255,255,255,0.1)" }}
          _focusVisible={{ background: "rgba(255,255,255,0)", borderColor: "#63b3ed" }}
          resize="none"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
        />
      </Flex>
    </>
  )
}