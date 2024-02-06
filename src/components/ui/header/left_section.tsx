import { Flex, LinkBox, LinkOverlay, Image } from '@chakra-ui/react'
import Tab from './tab';

export default function LeftSection() {
  return (
    <>
      <Flex direction={"row"} alignItems={"center"} gap={"50px"}>
          <LinkBox width="50px" height="50px">
            <LinkOverlay href={"/"}>
              <Image src="/images/IBLogo.svg" alt="IndieBlue Logo"  />
            </LinkOverlay>
          </LinkBox>
            <Tab label={"Explore"} hyperlink={"/explore"}></Tab>
            <Tab label={"Bluesletter"} hyperlink={"/bluesletter"}></Tab>
            <Tab label={"Support"} hyperlink={"/support"}></Tab>
        </Flex>
    </>
  )
}