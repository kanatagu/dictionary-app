import { useSearchParams } from 'react-router-dom';
import { List, Text } from '@chakra-ui/react';
import { MyWordCard } from '.';
import { MyWordType } from '../../types';

type MyWordListProps = {
  myWords: MyWordType[];
};

export const MyWordList = ({ myWords }: MyWordListProps) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  let newArray = [...myWords];

  const filteredMyWords = () => {
    if (category === 'all' || category === null) {
      return newArray.slice().reverse();
    }

    newArray = myWords.filter((item) => {
      const hasCategory = item.category.some(
        (itemCategory) => itemCategory.id === category
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
      {filteredMyWords().length ? (
        <>
          {filteredMyWords().map((item) => (
            <MyWordCard item={item} key={item.id} />
          ))}
        </>
      ) : (
        <Text>No words. Add words to this category!</Text>
      )}
    </List>
  );
};
