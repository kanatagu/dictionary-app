import {
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Button,
  Flex,
} from '@chakra-ui/react';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  submitButton: React.ReactNode;
  text: string;
  subText?: string;
};
export const ConfirmModal = ({
  isOpen,
  onClose,
  submitButton,
  text,
  subText,
}: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      returnFocusOnClose={false}
      preserveScrollBarGap
      isCentered
    >
      <ModalOverlay />
      <ModalContent p='32px' maxW='27.25rem'>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Text fontSize='xl' fontWeight={700}>
            {text}
          </Text>
          {subText && (
            <Text fontSize='md' fontWeight={400} mt='30px'>
              {subText}
            </Text>
          )}
          <Flex mt='30px' gap='20px' justifyContent='flex-end'>
            {submitButton}
            <Button onClick={onClose}>Cancel</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
