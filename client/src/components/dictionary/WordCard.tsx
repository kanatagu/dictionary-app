import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Button,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { AddWordModal } from '.';
import { useDeleteMyWord, useGetMyWords } from '../../hooks/myWord';
import { CategoryType, WordType } from '../../types';
import { processedText } from '../../utils';
import { ConfirmModal } from '../ui';

type WordCardProps = {
  data: WordType;
  categories: CategoryType[];
};

export const WordCard = ({ data, categories }: WordCardProps) => {
  const { word, definition, example, permalink } = data;
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const { data: myWords, refetch } = useGetMyWords();

  const id = myWords?.find((myWord) => myWord.word.defid === data.defid)?.id;

  const { deleteMyWord, isMutating } = useDeleteMyWord(
    onDeleteClose,
    String(id),
    refetch
  );

  const isInMyItem = !!id;

  const getHeartIcon = () => {
    return isInMyItem ? (
      <AiFillHeart onClick={onDeleteOpen} size='100%' />
    ) : (
      <AiOutlineHeart onClick={onAddOpen} size='100%' />
    );
  };

  return (
    <>
      <Box
        bgColor={'blue.800'}
        borderRadius='8px'
        px={{ base: '12px', md: '38px' }}
        py={{ base: '18px', md: '20px' }}
        w='100%'
      >
        <Flex align='center' justify='space-between'>
          <Heading
            fontSize={{ base: '3xl', md: '5xl' }}
            maxW={{ base: '82%', md: '92%' }}
          >
            {word}
          </Heading>
          <Button
            variant='unstyled'
            color='orange.600'
            w={{ base: '38px', md: '50px' }}
            h={{ base: '38px', md: '50px' }}
          >
            {getHeartIcon()}
          </Button>
        </Flex>
        <VStack align='stretch' mt='20px' gap={{ base: '20px', md: '30px' }}>
          <VStack align='stretch'>
            <Text
              fontWeight={500}
              fontSize={{ base: 'md', md: 'lg' }}
              overflowWrap='break-word'
            >
              {processedText(definition).map((text, index) =>
                text.link ? (
                  <Link
                    href={`https://www.urbandictionary.com/define.php?term=${text.text}`}
                    isExternal
                    key={index}
                    color='blue.200'
                  >
                    {text.text}
                    &nbsp;
                  </Link>
                ) : (
                  <React.Fragment key={index}>{text.text}</React.Fragment>
                )
              )}
            </Text>
          </VStack>
          <VStack
            align='stretch'
            p={{ base: '8px', md: '12px' }}
            bgColor='gray.700'
          >
            <Heading
              as='h3'
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight={600}
            >
              Example
            </Heading>
            <Text
              fontWeight={500}
              fontSize={{ base: 'md', md: 'lg' }}
              overflowWrap='break-word'
            >
              {processedText(example).map((text, index) =>
                text.link ? (
                  <Link
                    href={`https://www.urbandictionary.com/define.php?term=${text.text}`}
                    isExternal
                    key={index}
                    color='blue.200'
                  >
                    {text.text}
                    &nbsp;
                  </Link>
                ) : (
                  <React.Fragment key={index}>{text.text}</React.Fragment>
                )
              )}
            </Text>
          </VStack>
          <Box>
            <Link
              href={permalink}
              isExternal
              display='flex'
              alignItems='center'
              gap='4px'
              fontSize={{ base: 'sm', md: 'md' }}
              _hover={{ textDecor: 'none', opacity: '.8' }}
            >
              original site
              <FiExternalLink />
            </Link>
          </Box>
        </VStack>
      </Box>

      {isAddOpen && (
        <AddWordModal
          isOpen={isAddOpen}
          onClose={onAddClose}
          data={data}
          categories={categories}
        />
      )}

      {isDeleteOpen && (
        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          text={'Are you sure you want to Delete this word from My List?'}
          submitButton={
            <Button
              colorScheme='red'
              color='red.600'
              onClick={deleteMyWord}
              isLoading={isMutating}
            >
              Delete
            </Button>
          }
        />
      )}
    </>
  );
};
