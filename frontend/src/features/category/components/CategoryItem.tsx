import { useNavigate } from 'react-router-dom';
import { Flex, Box, Button, ListItem, useDisclosure } from '@chakra-ui/react';
import { useDeleteCategory } from '../hooks';
import { ConfirmModal } from '../../../components';
import { CategoryType } from '../../../types';

type CategoryItemProps = {
  category: CategoryType;
};

export const CategoryItem = ({ category }: CategoryItemProps) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteCategory } = useDeleteCategory(category, onClose);

  return (
    <>
      <ListItem
        key={category.id}
        display='flex'
        p='12px'
        alignItems='center'
        justifyContent='space-between'
        borderBottomWidth='2px'
        borderBottomColor='gray.600'
      >
        <Box fontSize='lg' maxW='64%'>
          {category.name}
        </Box>
        <Flex
          gap={{ base: '14px', md: '20px' }}
          flexDir={{ base: 'column', md: 'row' }}
        >
          <Button
            colorScheme='blue'
            variant='outline'
            w='82px'
            onClick={() => navigate(`/category/${category.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            colorScheme='red'
            color='red.400'
            variant='outline'
            w='82px'
            onClick={onOpen}
          >
            Delete
          </Button>
        </Flex>
      </ListItem>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        text={'Are you sure you want to Delete this category? '}
        subText={'*The Words in this category will also be deleted.'}
        submitButton={
          <Button colorScheme='red' color='red.600' onClick={deleteCategory}>
            Delete
          </Button>
        }
      />
    </>
  );
};
