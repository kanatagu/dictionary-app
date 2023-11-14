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
import { useEditMyItem } from '../hooks';
import { MyItemType } from '../../../types';

export type EditWordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  item: MyItemType;
};

export const EditWordModal = ({
  isOpen,
  onClose,
  item,
}: EditWordModalProps) => {
  const {
    errorMessage,
    editMyItem,
    clickHandler,
    isFavoriteThisCategory,
    storedCategoriesValue,
  } = useEditMyItem(item, onClose);

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
            <Box as='form' onSubmit={editMyItem}>
              <FormControl isInvalid={!!errorMessage}>
                <FormLabel>Memo</FormLabel>
                <Textarea
                  name='memo'
                  bgColor={'gray.700'}
                  placeholder='memo'
                  defaultValue={item.memo}
                />
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
                      defaultChecked={isFavoriteThisCategory(category.id)}
                      onChange={() => clickHandler(category)}
                    >
                      {category.name}
                    </Checkbox>
                  </ListItem>
                ))}
              </List>
              <Box textAlign='center' mt='50px'>
                <Button colorScheme='blue' size='lg' type='submit'>
                  Save Changes
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
