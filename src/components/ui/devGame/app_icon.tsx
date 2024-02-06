import { Text } from '@chakra-ui/react'
import FileUpload from './fileUpload'

interface AppIconProps {
    prefilledAppIcon?: string;
}

export default function AppIcon(props: AppIconProps) {
    return (
        <>
            <Text fontWeight={"600"} fontSize={"18px"}>App Icon</Text>
            <FileUpload id={"app-icon"} title={"Upload Icon"} instructions={"(.ico files only. Max dimensions of 256x256.)"} prefilled={props.prefilledAppIcon}/>
        </>
    )
}