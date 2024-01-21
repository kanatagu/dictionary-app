import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  List,
  ListItem,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Button,
  Text,
} from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import { useAddWord } from '../hooks';
import { CategoryType, WordType } from '../../../types';

export type AddWordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: WordType;
  categories: CategoryType[];
};

export const AddWordModal = ({
  isOpen,
  onClose,
  data,
  categories,
}: AddWordModalProps) => {
  const { errorMessages, clickHandler, addWord, isMutating } = useAddWord(
    onClose,
    data
  );

  const memoError = errorMessages.find((error) => error.label === 'memo');
  const categoryError = errorMessages.find(
    (error) => error.label === 'category'
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      returnFocusOnClose={false}
      preserveScrollBarGap
      isCentered
    >
      <ModalOverlay />
      <ModalContent px='24px' pt='24px' pb='32px' maxW='27.25rem'>
        <ModalBody p={0}>
          {categories.length ? (
            <Box as='form' onSubmit={addWord}>
              <FormControl isInvalid={!!memoError}>
                <FormLabel>Memo</FormLabel>
                <Textarea name='memo' bgColor={'gray.700'} placeholder='memo' />
                <FormErrorMessage>{memoError?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!categoryError}>
                <List display='flex' gap='10px' flexDir='column' mt='24px'>
                  {categories?.map((category) => (
                    <ListItem
                      key={category.id}
                      display='flex'
                      alignItems='center'
                      gap='8px'
                    >
                      <Checkbox
                        value={category.id}
                        size='lg'
                        onChange={() => clickHandler(category)}
                      >
                        {category.name}
                      </Checkbox>
                    </ListItem>
                  ))}
                </List>
                <FormErrorMessage>{categoryError?.message}</FormErrorMessage>
              </FormControl>

              <Box textAlign='center' mt='50px'>
                <Button
                  colorScheme='blue'
                  size='lg'
                  type='submit'
                  isLoading={isMutating}
                >
                  Add To My List
                </Button>
              </Box>
            </Box>
          ) : (
            <Box textAlign='center'>
              <Text fontSize='xl' fontWeight={700}>
                Please add a category first
              </Text>
              <Box mt='30px'>
                <Button
                  as={ReactRouterLink}
                  to={'/category/new'}
                  colorScheme='blue'
                  size='md'
                  display='flex'
                  alignItems='center'
                  w='160px'
                  mx='auto'
                  rightIcon={<FiChevronRight />}
                >
                  Add Category
                </Button>
              </Box>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
