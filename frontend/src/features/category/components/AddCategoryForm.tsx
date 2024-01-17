import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';
import { useAddCategory } from '../hooks';

export const AddCategoryForm = () => {
  const { errorMessage, addCategory } = useAddCategory();

  return (
    <Box as='form' onSubmit={addCategory}>
      <FormControl isInvalid={!!errorMessage}>
        <FormLabel>Category Name</FormLabel>
        <Input
          type='text'
          name='category'
          bgColor={'gray.700'}
          placeholder='category'
        />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>

      <Box textAlign='center' mt='50px'>
        <Button colorScheme='blue' size='lg' type='submit'>
          Add Category
        </Button>
      </Box>
    </Box>
  );
};
