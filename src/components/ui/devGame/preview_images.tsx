import { Text } from '@chakra-ui/react'
import FileUpload from './fileUpload';

interface PreviewImagesProps {
    prefilledDescImages?: string[];
}

export default function PreviewImages(props: PreviewImagesProps) {
    return (
        <>
            <Text fontWeight={"600"} fontSize={"18px"}>Preview Images (Max of 6)</Text>
            <FileUpload id="preview-image" title={"Upload Images"} instructions="(.png or .jpeg files only. 16:9 ratio recommended. Max file size of 200 KB each.)" prefilled={props.prefilledDescImages} customWidth="288px" customHeight="162px"/>
        </>
    )
}