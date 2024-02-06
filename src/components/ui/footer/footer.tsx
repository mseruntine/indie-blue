import { Stack, HStack, Link, Image, IconButton, Flex } from '@chakra-ui/react';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Providers } from '@/app/providers'

const accounts = [
  {
    url: '',
    label: 'Github Account',
    type: 'gray',
    icon: <FaDiscord />
  },
  {
    url: '',
    label: 'Twitter Account',
    type: 'twitter',
    icon: <FaTwitter />
  },
  {
    url: '',
    label: 'LinkedIn Account',
    type: 'linkedin',
    icon: <FaInstagram />
  }
];

const Footer = () => {
  return (
    <Providers>
      <Flex bg={"rgba(20, 20, 20, 0.5)"} width="100%">
        <Stack
          maxW="1920px"
          marginInline="auto"
          p={8}
          spacing="80px"
          justifyContent="space-between"
          alignItems="center"
          direction={{ base: 'column', lg: 'row' }}
        >
          <Link pl={{ base: "0", lg: "60px"}} href="/">
            <Image w="100px" src="/images/IB_HeroText.svg" alt="TemplatesKart" />
          </Link>

          {/* Desktop Screen */}
          <HStack spacing={8} alignItems="center" display="flex">
            <Link href="/marketing" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
              Marketing
            </Link>
            <Link href="/signup" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
              Sign Up
            </Link>
            <Link href="/contactus" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
              Contact Us
            </Link>
            <Link href="/terms" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
              Terms of Use
            </Link>
            <Link href="/privacy" fontSize="sm" _hover={{ textDecoration: 'underline' }}>
              Privacy Policy
            </Link>
          </HStack>

          <Stack direction="row" spacing={5} pr={{ base: "0", lg: "60px"}}  alignItems="center">
            {accounts.map((sc, index) => (
              <IconButton
                key={index}
                as={Link}
                isExternal
                href={sc.url}
                aria-label={sc.label}
                colorScheme={sc.type}
                icon={sc.icon}
                rounded="md"
                bg={"primary.600"}
              />
            ))}
          </Stack>
        </Stack>
      </Flex>
    </Providers>
  );
};

export default Footer;
