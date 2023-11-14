import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';
import { useEditCategory } from '../hooks';

export const EditCategoryForm = () => {
  const { errorMessage, editCategory, storedCategoryItem } = useEditCategory();

  return (
    <Box as='form' onSubmit={editCategory}>
      <FormControl isInvalid={!!errorMessage}>
        <FormLabel>Category Name</FormLabel>
        <Input
          type='text'
          name='category'
          bgColor={'gray.700'}
          placeholder='category'
          defaultValue={storedCategoryItem?.name}
        />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>

      <Box textAlign='center' mt='50px'>
        <Button colorScheme='blue' size='lg' type='submit'>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};
