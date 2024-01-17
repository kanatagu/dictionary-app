import { Container, Heading, Flex, Text } from '@chakra-ui/react';
import { useAuth } from '../hooks';

export const AccountPage = () => {
  const { user } = useAuth();
  
  return (
    <Container maxW={{ base: '100%', lg: 'container.sm' }} pt='40px' pb='80px'>
      <Heading>Account Info</Heading>
      <Flex
        mt={{ base: '30px', md: '80px' }}
        align='center'
        gap='38px'
        justify={{ base: 'start', md: 'space-between' }}
        maxW={{ base: '100%', md: '280px' }}
        pb='12px'
        mx='auto'
      >
        <Heading as='h3' fontSize='2xl'>
          Email
        </Heading>
        <Text fontSize='xl'>{user?.email}</Text>
      </Flex>
    </Container>
  );
};
