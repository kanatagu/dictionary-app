import {
  Box,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  List,
  ListItem,
  Checkbox,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';

const favoriteCategories = [
  { id: '1', name: 'category1' },
  { id: '2', name: 'category2' },
];

export type AddWordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddWordModal = ({ isOpen, onClose }: AddWordModalProps) => {
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
          <Heading fontSize='xl' as='h2'>
            Add To My List
          </Heading>

          <List display='flex' gap='6px' flexDir='column' mt='24px'>
            {favoriteCategories?.map((category) => (
              <ListItem
                key={category.id}
                display='flex'
                alignItems='center'
                gap='8px'
              >
                <Checkbox
                  value={category.id}
                  // defaultChecked={isFavoriteThisCategory(category.id)}
                  onChange={
                    () => console.log('change')
                    // changeClickHandler({
                    //   userId: userData.id,
                    //   favoriteCategoryId: category.id,
                    // })
                  }
                >
                  {category.name}
                </Checkbox>
              </ListItem>
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
