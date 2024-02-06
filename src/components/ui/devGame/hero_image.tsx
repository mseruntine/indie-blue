import { Text } from '@chakra-ui/react'
import FileUpload from './fileUpload';

interface HeroImageProps {
    prefilledHeroImage?: string;
}

export default function HeroImage(props: HeroImageProps) {
    return (
        <>
            <Text fontWeight={"600"} fontSize={"18px"}>Hero Image</Text>
            <FileUpload id="hero-image" title={"Upload Image"} instructions={"(.png or .jpeg files only. 16:9 ratio recommended. Max file size of 200 KB.)"} prefilled={props.prefilledHeroImage} customWidth="320px" customHeight="180px"/>
        </>
    )
}