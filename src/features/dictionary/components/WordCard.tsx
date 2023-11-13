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
import { AddWordModal } from '../components';
import { WordType, MyItemType } from '../../../types';
import { processedText } from '../../../utils';
import { useLocalStorage } from '../../../hooks';

type WordCardProps = {
  data: WordType;
};

export const WordCard = ({ data }: WordCardProps) => {
  const { defid, word, definition, example, permalink } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [storedMyItemsValue, setStoredMyItemsValue] = useLocalStorage<
    MyItemType[]
  >('myItem', []);

  const handleDelete = () => {
    const filteredMyItems = storedMyItemsValue.filter(
      (item) => item.word.defid !== defid
    );
    setStoredMyItemsValue(filteredMyItems);
  };

  const getHeartIcon = () => {
    const foundItem = storedMyItemsValue.some(
      (item) => item.word.defid === defid
    );
    return foundItem ? (
      <AiFillHeart onClick={handleDelete} size='100%' />
    ) : (
      <AiOutlineHeart onClick={onOpen} size='100%' />
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

      {isOpen && <AddWordModal isOpen={isOpen} onClose={onClose} data={data} />}
    </>
  );
};
