import { useSearchParams } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { useLocalStorage } from '../../../hooks';
import { CategoryType } from '../../../types';

type NavListType = {
  onClose?: () => void;
};
export const NavList = ({ onClose }: NavListType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [storedCategoriesValue, _] = useLocalStorage<CategoryType[]>(
    'category',
    []
  );

  const newArray = [...storedCategoriesValue];
  newArray.unshift({ id: 0, name: 'All' });

  const clickHandler = (categoryId: number) => {
    setSearchParams({ category: categoryId.toString() });
    if (onClose) onClose();
  };

  return (
    <Flex my={{ base: '0', lg: '20px' }} flexDir='column'>
      {newArray.map((category) => {
        const isActive = Number(categoryParam) === category.id;
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
