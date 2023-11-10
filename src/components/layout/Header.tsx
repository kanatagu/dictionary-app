import { Flex, Box } from '@chakra-ui/react';
import { CustomNavLink } from '..';

export const Header = () => {
  return (
    <Box
      as='header'
      h='60px'
      bg='blue.dark'
      position='fixed'
      zIndex='sticky'
      color='gray.100'
      w='100%'
      fontWeight='700'
      fontSize='lg'
    >
      <Flex
        align='center'
        justify='center'
        h='100%'
        gap={{ base: '30px', md: '80px' }}
      >
        <CustomNavLink to='/'>HOME</CustomNavLink>
        <CustomNavLink to='/my-list'>MY LIST</CustomNavLink>
        <CustomNavLink to='/categories'>CATEGORY</CustomNavLink>
      </Flex>
    </Box>
  );
};
