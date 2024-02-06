import { Image, Grid, GridItem, Flex, Spacer } from '@chakra-ui/react'
import { useState } from 'react';

interface GameCarouselProps
{
    heroImage: string;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: string;
}





export default function GameCarousel(props:GameCarouselProps) {

    const [focused, setFocused] = useState(props.heroImage);

    const [heroSelected, setHeroSelected] = useState(true);
    const [img1Selected, setImg1Selected] = useState(false);
    const [img2Selected, setImg2Selected] = useState(false);
    const [img3Selected, setImg3Selected] = useState(false);
    const [img4Selected, setImg4Selected] = useState(false);
    const [img5Selected, setImg5Selected] = useState(false);
    const [img6Selected, setImg6Selected] = useState(false);

    const selectedBorder = (variable:boolean) => {
        let border
        if (variable) {
            border = "2px solid white"
        }
        else {
            border = "none"
        }
        return border
    }

    function resetBorders()
    {
        setHeroSelected(false);
        setImg1Selected(false);
        setImg2Selected(false);
        setImg3Selected(false);
        setImg4Selected(false);
        setImg5Selected(false);
        setImg6Selected(false);
    }

    return (
        <>
            <Grid
            templateAreas={`"focus"
            "imageBar"`}
            rowGap={"8px"}
            w={"full"}>
                <GridItem area="focus" aspectRatio={16 / 9}>
                    <Image src={focused} objectFit="cover" alt='Focus Image' borderRadius="12px" w="100%" h="100%" />
                </GridItem>
                <GridItem area="imageBar">
                    <Flex w="100%" dir="row" pb="8px" mt="8px">
                        <Image src={props.heroImage} objectFit="cover" alt='Hero Image' aspectRatio={16 / 9} borderRadius="6px" w="100%" maxW="13%" h="100%" onClick={ () => { setFocused(props.heroImage); resetBorders(); setHeroSelected(true); }} _hover={{cursor: "pointer", border: "2px solid #FFFFFF88"}} border={selectedBorder(heroSelected)} />
                        <Spacer />
                        <Image src={props.image1} objectFit="cover" alt='Descriptive Image 1' aspectRatio={16 / 9} borderRadius="6px" w="100%" maxW="13%" h="100%" onClick={ () => { setFocused(props.image1); resetBorders(); setImg1Selected(true); }} _hover={{cursor: "pointer", border: "2px solid #FFFFFF88"}} border={selectedBorder(img1Selected)} />
                        <Spacer />
                        <Image src={props.image2} objectFit="cover" alt='Descriptive Image 2' aspectRatio={16 / 9} borderRadius="6px" w="100%" maxW="13%" h="100%" onClick={ () => { setFocused(props.image2); resetBorders(); setImg2Selected(true); }} _hover={{cursor: "pointer", border: "2px solid #FFFFFF88"}} border={selectedBorder(img2Selected)} />
                        <Spacer />
                        <Image src={props.image3} objectFit="cover" alt='Descriptive Image 3' aspectRatio={16 / 9} borderRadius="6px" w="100%" maxW="13%" h="100%" onClick={ () => { setFocused(props.image3); resetBorders(); setImg3Selected(true); }} _hover={{cursor: "pointer", border: "2px solid #FFFFFF88"}} border={selectedBorder(img3Selected)} />
                        <Spacer />
                        <Image src={props.image4} objectFit="cover" alt='Descriptive Image 4' aspectRatio={16 / 9} borderRadius="6px" w="100%" maxW="13%" h="100%" onClick={ () => { setFocused(props.image4); resetBorders(); setImg4Selected(true); }} _hover={{cursor: "pointer", border: "2px solid #FFFFFF88"}} border={selectedBorder(img4Selected)} />
                        <Spacer />
                        <Image src={props.image5} objectFit="cover" alt='Descriptive Image 5' aspectRatio={16 / 9} borderRadius="6px" w="100%" maxW="13%" h="100%" onClick={ () => { setFocused(props.image5); resetBorders(); setImg5Selected(true); }} _hover={{cursor: "pointer", border: "2px solid #FFFFFF88"}} border={selectedBorder(img5Selected)} />
                        <Spacer />
                        <Image src={props.image6} objectFit="cover" alt='Descriptive Image 6' aspectRatio={16 / 9} borderRadius="6px" w="100%" maxW="13%" h="100%" onClick={ () => { setFocused(props.image6); resetBorders(); setImg6Selected(true); }} _hover={{cursor: "pointer", border: "2px solid #FFFFFF88"}} border={selectedBorder(img6Selected)} />
                    </Flex>
                </GridItem>
            </Grid>
        </>
    )
}