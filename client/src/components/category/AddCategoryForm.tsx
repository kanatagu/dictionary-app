import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';
import { useAddCategory } from '../../hooks/category';

export const AddCategoryForm = () => {
  const { errorMessage, addCategory, isMutating } = useAddCategory();

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
        <Button
          colorScheme='blue'
          size='lg'
          type='submit'
          isLoading={isMutating}
        >
          Add Category
        </Button>
      </Box>
    </Box>
  );
};
