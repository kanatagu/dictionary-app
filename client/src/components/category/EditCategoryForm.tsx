import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';
import { useEditCategory } from '../../hooks/category';
import { CategoryType } from '../../types';

type EditCategoryFormProps = {
  data: CategoryType;
};
export const EditCategoryForm = ({ data }: EditCategoryFormProps) => {
  const { errorMessage, editCategory } = useEditCategory(data.id);

  return (
    <Box as='form' onSubmit={editCategory}>
      <FormControl isInvalid={!!errorMessage}>
        <FormLabel>Category Name</FormLabel>
        <Input
          type='text'
          name='category'
          bgColor={'gray.700'}
          placeholder='category'
          defaultValue={data?.name}
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
