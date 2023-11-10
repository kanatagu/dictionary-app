import {
  Container,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import {
  useRouteError,
  isRouteErrorResponse,
  Link as ReactRouterLink,
} from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();

  function errorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === 'string') {
      return error;
    } else {
      console.error(error);
      return '';
    }
  }

  return (
    <div id='error-page'>
      <Container maxW={{ base: '100%', lg: 'container.lg' }} h='100vh'>
        <VStack justify='center' align='center' gap='40px' h='100%'>
          <Heading as='h1'>Oops!</Heading>
          <Text fontSize='lg'>Sorry, an unexpected error has occurred.</Text>
          <Text>{errorMessage(error)}</Text>
          <ChakraLink
            as={ReactRouterLink}
            to={'/'}
            color='blue.500'
            _hover={{ opacity: '.8' }}
          >
            Back To Top
          </ChakraLink>
        </VStack>
      </Container>
    </div>
  );
};
