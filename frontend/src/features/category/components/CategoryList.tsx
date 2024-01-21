import { List } from '@chakra-ui/react';
import { CategoryItem } from '../components';
import { CategoryType } from '../../../types';

type CategoryListProps = {
  data: CategoryType[];
};

export const CategoryList = ({ data }: CategoryListProps) => {
  return (
    <List
      mt={{ base: '30px', md: '80px' }}
      display='flex'
      flexDir='column'
      gap='20px'
    >
      {data.map((item) => (
        <CategoryItem category={item} key={item.id} />
      ))}
    </List>
  );
};
