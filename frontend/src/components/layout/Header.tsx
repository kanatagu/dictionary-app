import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
} from '@chakra-ui/react';
import { CustomNavLink } from '../../components/layout';
import {
  MdAccountCircle,
  MdManageAccounts,
  MdOutlineLogout,
} from 'react-icons/md';
import { useLogout } from '../../hooks/auth';

export const Header = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

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
      <Container maxW={{ base: '100%', lg: 'container.lg' }} h='100%'>
        <Flex
          align='center'
          justify='center'
          gap={{ base: '30px', md: '80px' }}
          h='100%'
          position='relative'
        >
          <CustomNavLink to='/'>HOME</CustomNavLink>
          <CustomNavLink to='/my-words'>MY WORDS</CustomNavLink>
          <CustomNavLink to='/category'>CATEGORY</CustomNavLink>
          <Menu>
            <MenuButton aria-label='Options' color='gray.200'>
              <MdAccountCircle size='30px' />
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<MdManageAccounts />}
                onClick={() => navigate('/account')}
              >
                Account
              </MenuItem>
              <MenuItem icon={<MdOutlineLogout />} onClick={logout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </Box>
  );
};
