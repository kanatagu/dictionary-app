import { useSearchParams } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { CategoryType } from '../../types';

type NavListType = {
  onClose?: () => void;
  categories: CategoryType[];
};

export const NavList = ({ onClose, categories }: NavListType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const newArray = [...categories];
  newArray.unshift({ id: 'all', name: 'All' });

  const clickHandler = (categoryId: string) => {
    setSearchParams({ category: categoryId });
    if (onClose) onClose();
  };

  return (
    <Flex my={{ base: '0', lg: '20px' }} flexDir='column'>
      {newArray.map((category) => {
        const isActive = categoryParam === category.id;
        return (
          <Box
            as='button'
            key={category.id}
            onClick={() => clickHandler(category.id)}
            w='100%'
            px='20px'
            py='14px'
            textAlign='left'
            fontSize='lg'
            bgColor={isActive ? 'gray.700' : 'transparent'}
            _hover={{ color: 'gray.400' }}
          >
            {category.name}
          </Box>
        );
      })}
    </Flex>
  );
};
