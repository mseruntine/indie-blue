import { Flex, Text, Select, } from '@chakra-ui/react'
import { useState } from 'react';

interface SelectFormProps {
  id: string;
  title: string;
  prefilled?: string;
  options?: string[];
  placeholder?: string;
  customWidth?: string;
  customHeight?: string;
}

export default function SelectForm(props: SelectFormProps) {
  const [currentInput, setCurrentInput] = useState(props.prefilled);
  return (
    <>
      <Flex direction={"column"} gap={"5px"}>
        <Text fontWeight={"600"} fontSize={"18px"}>{props.title}</Text>
        <Select
          id={props.id}
          flex={1}
          placeholder={props.placeholder}
          width={props.customWidth}
          height={props.customHeight}
          background={"rgba(255,255,255,0.2)"}
          mb={6}
          _hover={{ background: "rgba(255,255,255,0.1)" }}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
        >
          {props.options != null ? props.options.map((option) => (
            <option key={option} style={{ background: "#2D3748" }} value={option}>{option}</option>
          )) : null}
        </Select>
      </Flex>
    </>
  )
}