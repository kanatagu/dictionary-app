import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Flex,
  Tag,
  TagLeftIcon,
} from '@chakra-ui/react';
import { FiExternalLink, FiTag } from 'react-icons/fi';
import { OptionButton } from '../components';
import { MyItemType } from '../../../types';
import { processedText } from '../../../utils';

type MyItemCardProps = {
  item: MyItemType;
};

export const MyItemCard = ({ item }: MyItemCardProps) => {
  const { memo, word, category } = item;

  return (
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
          {word.word}
        </Heading>
        <OptionButton myItem={item} />
      </Flex>
      <VStack align='stretch' mt='20px' gap={{ base: '20px', md: '30px' }}>
        <VStack align='stretch'>
          <Text
            fontWeight={500}
            fontSize={{ base: 'md', md: 'lg' }}
            overflowWrap='break-word'
          >
            {processedText(word.definition).map((text, index) =>
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
          <Heading as='h3' fontSize={{ base: 'sm', md: 'md' }} fontWeight={600}>
            Example
          </Heading>
          <Text
            fontWeight={500}
            fontSize={{ base: 'md', md: 'lg' }}
            overflowWrap='break-word'
          >
            {processedText(word.example).map((text, index) =>
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
            href={word.permalink}
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
        {memo && (
          <Box>
            <Heading
              as='h3'
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight={600}
            >
              Memo
            </Heading>
            <Text whiteSpace={'pre-wrap'}>{memo}</Text>
          </Box>
        )}

        <Flex gap={'14px'} flexWrap='wrap'>
          {category.map((category) => (
            <Tag key={category.id}>
              <TagLeftIcon as={FiTag} />
              {category.name}
            </Tag>
          ))}
        </Flex>
      </VStack>
    </Box>
  );
};
