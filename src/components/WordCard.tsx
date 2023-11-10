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
import { WordType } from '../type';
import { processedText } from '../utils';

type WordCardProps = {
  data: WordType;
};

export const WordCard = ({ data }: WordCardProps) => {
  const { defid, word, definition, example, permalink } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bgColor={'blue.800'}
        borderRadius='8px'
        px={{ base: '12px', md: '38px' }}
        py={{ base: '18px', md: '20px' }}
        w={{ base: '100%', lg: '100%' }}
      >
        <Flex align='center' justify='space-between'>
          <Heading fontSize={'5xl'} maxW={{ base: '82%', md: '92%' }}>
            {word}
          </Heading>
          <Button variant='unstyled' color='orange.600'>
            {/* <AiFillHeart size='50px' /> */}
            <AiOutlineHeart size='50px' onClick={onOpen} />
          </Button>
        </Flex>
        <VStack align='stretch' mt='20px' gap='30px'>
          <VStack align='stretch'>
            <Text fontWeight={500} fontSize='lg' overflowWrap='break-word'>
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
          <VStack
            align='stretch'
            p={{ base: '8px', md: '12px' }}
            bgColor='gray.700'
          >
            <Heading as='h3' fontSize={'md'} fontWeight={600}>
              Example
            </Heading>
            <Text fontWeight={500} fontSize='lg' overflowWrap='break-word'>
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
              _hover={{ textDecor: 'none', opacity: '.8' }}
            >
              original site
              <FiExternalLink />
            </Link>
          </Box>
        </VStack>
      </Box>

      <AddWordModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
