import { Container, Heading, Box } from '@chakra-ui/react';

export const AccountPage = () => {
  return (
    <Container maxW={{ base: '100%', lg: 'container.sm' }} pt='40px' pb='80px'>
      <Heading>Account Info</Heading>
      <Box mt={{ base: '30px', md: '80px' }}>Account</Box>
    </Container>
  );
};
