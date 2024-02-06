/* eslint-disable react/no-unescaped-entities */
"use client"

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Container, Heading, Text, Link } from '@chakra-ui/react'

export default function Support() {

  return (
    <>
      <Container minW="80%" w="100%" paddingTop="30px" centerContent>
        <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" w="100%" my={12}>
          <Heading as="h2" size="xl" mb={6}>
            IndieBlue Support
          </Heading>
          <Text mb={6} fontWeight="600">
            What can we help you with today?
          </Text>
          <Accordion w="100%" allowToggle>

            <AccordionItem>
              <h2>
                <AccordionButton fontSize="22px" fontWeight="500">
                  <Box as="span" flex='1' textAlign='left'>
                    Getting in touch with an IndieBlue team member
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                For any questions, concerns, or any other general inquiries, you can reach out to our team by filling out a form{' '}
                <Link color='secondary.400' href='/contactus'>
                  here.
                </Link>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton fontSize="22px" fontWeight="500">
                  <Box as="span" flex='1' textAlign='left'>
                    As a developer, how can I showcase my game on IndieBlue?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                IndieBlue connects indie developers with players eager to try out new indie games! If you're a developer who's interested in
                showcasing your game on our platform, you can sign up for a free developer account {' '}
                <Link color='secondary.400' href='signup'>
                  here.
                </Link>
                {' '}After making a developer account, check out the developer dashboard to submit a game.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton fontSize="22px" fontWeight="500">
                  <Box as="span" flex='1' textAlign='left'>
                    What's a Bluesletter?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Every two weeks, IndieBlue reaches out to you to give you a selection of games that are specially curated around the genres you choose! The
                Bluesletter cuts down the amount of time players spend looking for their next favorite game, letting them spend more time actually enjoying the gaming experience!

              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton fontSize="22px" fontWeight="500">
                  <Box as="span" flex='1' textAlign='left'>
                    Setting up an account
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Setting up an account is easy! You can create a user or developer account {' '}
                <Link color='secondary.400' href='signup'>
                  here.
                </Link>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton fontSize="22px" fontWeight="500">
                  <Box as="span" flex='1' textAlign='left'>
                    Recovering an account
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                If you've forgotten the password for your account, you can reset your password {' '}
                <Link color='secondary.400' href='/'>
                  here.
                </Link>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton fontSize="22px" fontWeight="500">
                  <Box as="span" flex='1' textAlign='left'>
                    Setting up a profile
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                By signing up, you can set up your profile and configure your Bluesletter settings, customize your profile picture, and
                gain the ability to leave reviews.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton fontSize="22px" fontWeight="500">
                  <Box as="span" flex='1' textAlign='left'>
                    Game reviews
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Game reviews provide valuable feedback to indie developers! Once you make an account, you'll have the ability to leave
                reviews on each game's page.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton fontSize="22px" fontWeight="500">
                  <Box as="span" flex='1' textAlign='left'>
                    Downloading games
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                To download a game, you can visit the external link provided on each game's explore page.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton fontSize="22px" fontWeight="500">
                  <Box as="span" flex='1' textAlign='left'>
                    Developer tools
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Developers showcasing their games on IndieBlue gain access to our developer dashboard, which shows the amount of times their games
                were included in Bluesletters, how many interactions their game has received, and other analytics to provide valuable marketing information.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton fontSize="22px" fontWeight="500">
                  <Box as="span" flex='1' textAlign='left'>
                    Canceling or changing a game's subscription plan
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                As a developer, you can manage your game's subscription plan by visiting the developer dashboard, clicking "Manage" next to the game of your choice, and clicking "Manage Subscription."
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton fontSize="22px" fontWeight="500">
                  <Box as="span" flex='1' textAlign='left'>
                    IndieBlue community
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Your feedback is invaluable, and we appreciate the time you take to share your thoughts through reviews. When leaving reviews, focus on constructive criticism, and help fellow gamers make informed decisions. Respectful and honest reviews contribute to the growth of our community.
                By joining IndieBlue, you're becoming a part of a global group who share a common love for gaming. Let's build a community that thrives on camaraderie, respect, and positive interactions. Together, we can create an exceptional gaming experience for everyone.

                Thank you for being a valued member of the IndieBlue community!
              </AccordionPanel>
            </AccordionItem>

          </Accordion>
        </Box>
      </Container>
    </>
  )
}
