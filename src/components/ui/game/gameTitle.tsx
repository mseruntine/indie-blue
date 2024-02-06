import { Text, Grid, GridItem, Image } from '@chakra-ui/react'

interface GameTitleProps
{
    icon: string;
    title: string;
    dev: string;

}

export default function GameTitle(props:GameTitleProps) {
    return (
        <>
            <Grid
            templateAreas={`"icon title"
            "icon dev"`}
            templateColumns={"96px 1fr"}
            templateRows={"75px 22px"}
            columnGap={"21"}
            w={"full"}>
                <GridItem area={"icon"}>
                    <Image borderRadius={"12px"} src={props.icon} alt={"Game Icon"} height={"96px"} />
                </GridItem>
                <GridItem area={"title"} justifyItems={"left"}>
                    <Text fontWeight={"700"} fontSize={"60px"} mt={"-18px"}>{props.title}</Text>
                </GridItem>
                <GridItem area={"dev"}>
                    <Text fontSize={"21px"} pl={"4px"} mt={"-12px"} color={"#FFFFFF87"}>{props.dev}</Text>
                </GridItem>
            </Grid>
        </>
    )
}