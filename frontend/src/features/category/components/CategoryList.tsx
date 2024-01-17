import { List } from '@chakra-ui/react';
import { useLocalStorage } from '../../../hooks';
import { CategoryItem } from '../components';
import { CategoryType } from '../../../types';

export const CategoryList = () => {
  const [storedCategoriesValue, _] = useLocalStorage<CategoryType[]>(
    'category',
    []
  );

  return (
    <List
      mt={{ base: '30px', md: '80px' }}
      display='flex'
      flexDir='column'
      gap='20px'
    >
      {storedCategoriesValue.map((item) => (
        <CategoryItem category={item} key={item.id} />
      ))}
    </List>
  );
};
