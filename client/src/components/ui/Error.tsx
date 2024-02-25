import {
  Container,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

type ErrorProps = {
  backLink?: string;
  errorMessage?: string;
};

export const Error = ({ backLink, errorMessage }: ErrorProps) => {
  return (
    <Container maxW={{ base: '100%', lg: 'container.lg' }} h='100vh'>
      <VStack justify='center' align='center' gap='40px' h='100%'>
        <Heading as='h1'>Oops!</Heading>
        <Text fontSize='lg'>Sorry, an unexpected error has occurred.</Text>
        {errorMessage && <Text>{errorMessage}</Text>}
        <ChakraLink
          as={ReactRouterLink}
          to={backLink || '/'}
          color='blue.500'
          _hover={{ opacity: '.8' }}
        >
          {backLink ? 'Try Again' : 'Back To Top'}
        </ChakraLink>
      </VStack>
    </Container>
  );
};
