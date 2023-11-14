import { useSearchParams } from 'react-router-dom';
import { List, Text } from '@chakra-ui/react';
import { MyItemCard } from '.';
import { useLocalStorage } from '../../../hooks';
import { MyItemType } from '../../../types';

export const MyItemList = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [storedMyItemsValue] = useLocalStorage<MyItemType[]>('myItem', []);

  let newArray = [...storedMyItemsValue];

  const filteredMyItems = () => {
    if (category === '0' || category === null) {
      return newArray.slice().reverse();
    }

    newArray = storedMyItemsValue.filter((item) => {
      const hasCategory = item.category.some(
        (itemCategory) => itemCategory.id === Number(category)
      );
      return hasCategory;
    });

    return newArray.slice().reverse();
  };

  return (
    <List
      display='flex'
      flexDir='column'
      gap='40px'
      mt={{ base: '30px', lg: '40px' }}
      ml={{ base: '0px', lg: '240px' }}
      pl={{ base: '0px', lg: '40px' }}
      mb='80px'
      flexGrow={1}
    >
      {filteredMyItems().length ? (
        <>
          {filteredMyItems().map((item) => (
            <MyItemCard item={item} key={item.id} />
          ))}
        </>
      ) : (
        <Text>No words. Add words to this category!</Text>
      )}
    </List>
  );
};
