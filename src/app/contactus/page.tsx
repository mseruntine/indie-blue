"use client"

import { Container, Heading, Text, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import { FormEvent } from 'react';



export default function Support() {
  
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Container maxW="xl" paddingTop="30px" centerContent>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" mt={12}>
        <Heading as="h2" size="xl" mb={6}>
          Contact Us
        </Heading>
        <Text mb={6}>
          Have a question, suggestion, or just want to say hello? Reach out to us
          using the form below.
        </Text>

        <form onSubmit={handleSubmit}>
          <FormControl id="name" mb={4}>
            <FormLabel>Your Name</FormLabel>
            <Input type="text" placeholder="John Doe" required />
          </FormControl>

          <FormControl id="email" mb={4}>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="john@example.com" required />
          </FormControl>

          <FormControl id="message" mb={4}>
            <FormLabel>Your Message</FormLabel>
            <Textarea placeholder="Type your message here..." rows={4} required />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
    </>
  )
}
