import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  Button,
  ListItem,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ConfirmModal } from '../../../components';
import { useLocalStorage } from '../../../hooks';

type CategoryItemProps = {
  category: {
    id: number;
    name: string;
  };
};
export const CategoryItem = ({ category }: CategoryItemProps) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const afterSubmit = () => {
    toast({
      title: 'Success!',
      description: 'Deleted category name.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };
  const [storedValue, setStoredValue] = useLocalStorage<
    { id: number; name: string }[]
  >('category', [], afterSubmit);

  const handleDelete = () => {
    const filteredCategory = storedValue.filter(
      (item) => item.id !== category.id
    );
    setStoredValue(filteredCategory);
  };

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
        <Flex gap='20px' flexDir={{ base: 'column', md: 'row' }}>
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
        text={'Are you sure you want to Delete this category?'}
        submitButton={
          <Button colorScheme='red' color='red.600' onClick={handleDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
};
