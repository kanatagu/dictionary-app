import {
  Box,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { NavList } from '../layout';
import { useIsMobile } from '../../hooks/common';
import { CategoryType } from '../../types';

type SidebarProps = {
  categories: CategoryType[];
};

export const Sidebar = ({ categories }: SidebarProps) => {
  const isMobile = useIsMobile('lg');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isMobile ? (
        <>
          <Box mt='40px'>
            <Button onClick={onOpen} size='lg'>
              Select Category
            </Button>
          </Box>
          <Drawer placement='left' size='xs' isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay>
              <DrawerContent bgColor='gray.800'>
                <DrawerCloseButton />
                <DrawerHeader pt={'40px'} pb={0} fontSize='2xl'>
                  Category
                </DrawerHeader>
                <DrawerBody p='12px'>
                  <NavList onClose={onClose} categories={categories} />
                </DrawerBody>
                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      ) : (
        <Box
          minH='100vh'
          borderRight='1px'
          borderRightColor='gray.700'
          w={{ base: '100%', lg: '240px' }}
          flexShrink={0}
          position='fixed'
        >
          <Text
            fontSize='2xl'
            fontFamily='monospace'
            fontWeight={700}
            px='20px'
            mt='40px'
          >
            Category
          </Text>
          <NavList categories={categories} />
        </Box>
      )}
    </>
  );
};
