import { List } from '@chakra-ui/react';
import { useLocalStorage } from '../../../hooks';
import { CategoryItem } from '../components';

export const CategoryList = () => {
  const [storedValue, _] = useLocalStorage<{ id: number; name: string }[]>(
    'category',
    []
  );

  return (
    <>
      <List mt='80px' display='flex' flexDir='column' gap='20px'>
        {storedValue.map((item) => (
          <CategoryItem category={item} key={item.id} />
        ))}
      </List>
    </>
  );
};
