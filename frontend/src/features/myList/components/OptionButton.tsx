import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiEdit, FiTrash2 } from 'react-icons/fi';
import { EditWordModal } from '../components';
import { useDeleteMyItem } from '../hooks';
import { ConfirmModal } from '../../../components';
import { MyItemType } from '../../../types';

type OptionButtonProps = {
  myItem: MyItemType;
};

export const OptionButton = ({ myItem }: OptionButtonProps) => {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const { deleteMyItem } = useDeleteMyItem(myItem, onDeleteClose);

  return (
    <>
      <Menu>
        <MenuButton as={'button'} aria-label='Options'>
          <FiMoreHorizontal size='30px' />
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiEdit />} onClick={onEditOpen}>
            Edit
          </MenuItem>
          <MenuItem icon={<FiTrash2 />} onClick={onDeleteOpen}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>

      <EditWordModal isOpen={isEditOpen} onClose={onEditClose} item={myItem} />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        text={'Are you sure you want to Delete this word?'}
        submitButton={
          <Button colorScheme='red' color='red.600' onClick={deleteMyItem}>
            Delete
          </Button>
        }
      />
    </>
  );
};
