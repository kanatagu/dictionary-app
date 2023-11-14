import { useRef } from 'react';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

export const SearchWord = ({ ...props }: ChakraInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [_, setSearchParams] = useSearchParams();

  const pressEnter = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      const inputValue = (e.target as HTMLInputElement).value;
      setSearchParams({ word: inputValue });

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <InputGroup>
      <ChakraInput
        ref={inputRef}
        {...props}
        placeholder='Search the word'
        focusBorderColor='blue.500'
        bgColor={'gray.700'}
        h='42px'
        _placeholder={{ color: 'gray.400' }}
        // TODO Fix type
        onKeyDown={pressEnter}
      />
      <InputLeftElement>
        <FiSearch size='24px' />
      </InputLeftElement>
    </InputGroup>
  );
};
