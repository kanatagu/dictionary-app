import { useState, FormEventHandler } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import { useLocalStorage } from '../../../hooks';
import { MyItemType, CategoryType, WordType } from '../../../types';

export type AddWordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: WordType;
};

export const AddWordModal = ({ isOpen, onClose, data }: AddWordModalProps) => {
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState('');
  const [checkedCategory, setCheckedCategory] = useState<CategoryType[]>([]);

  const afterSubmit = () => {
    console.log('after');
    toast({
      title: 'Success!',
      description: 'Added to my list',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const [storedCategoriesValue, _] = useLocalStorage<
    { id: number; name: string }[]
  >('category', []);
  const [storedMyItemsValue, setStoredMyItemsValue] = useLocalStorage<
    MyItemType[]
  >('myItem', [], afterSubmit);

  const clickHandler = (category: CategoryType) => {
    const foundItem = checkedCategory.some(
      (checkedItem) => checkedItem.id === category.id
    );

    if (foundItem) {
      setCheckedCategory(
        checkedCategory.filter((checkedItem) => checkedItem.id !== category.id)
      );
    } else {
      setCheckedCategory([...checkedCategory, category]);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    console.log('submit!');
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const inputMemo = form.get('memo')?.toString() || '';

    if (inputMemo.length > 100) {
      setErrorMessage('Enter a memo less than 100 characters');
    }

    const id = storedMyItemsValue.length
      ? storedMyItemsValue.slice(-1)[0].id + 1
      : 1;

    const newData: MyItemType = {
      id,
      memo: inputMemo,
      word: data,
      category: checkedCategory,
    };

    setStoredMyItemsValue([...storedMyItemsValue, newData]);
  };

  console.log('checkedCategory', checkedCategory);
  console.log('storedMyListValue', storedMyItemsValue);

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
          {storedCategoriesValue.length ? (
            <Box as='form' onSubmit={handleSubmit}>
              <FormControl isInvalid={!!errorMessage}>
                <FormLabel>Memo</FormLabel>
                <Textarea name='memo' bgColor={'gray.700'} placeholder='memo' />
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
              </FormControl>

              <List display='flex' gap='10px' flexDir='column' mt='24px'>
                {storedCategoriesValue?.map((category) => (
                  <ListItem
                    key={category.id}
                    display='flex'
                    alignItems='center'
                    gap='8px'
                  >
                    <Checkbox
                      value={category.id}
                      size='lg'
                      // TODO
                      // defaultChecked={isFavoriteThisCategory(category.id)}
                      onChange={() => clickHandler(category)}
                    >
                      {category.name}
                    </Checkbox>
                  </ListItem>
                ))}
              </List>
              <Box textAlign='center' mt='50px'>
                <Button colorScheme='blue' size='lg' type='submit'>
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
