import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FiMoreHorizontal, FiEdit, FiTrash2 } from 'react-icons/fi';

export const OptionButton = () => {
  return (
    <Menu>
      <MenuButton as={'button'} aria-label='Options'>
        <FiMoreHorizontal size='30px' />
      </MenuButton>
      <MenuList>
        <MenuItem icon={<FiEdit />}>Edit</MenuItem>
        <MenuItem icon={<FiTrash2 />}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};
