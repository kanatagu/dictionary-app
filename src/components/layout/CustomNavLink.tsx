import { Link as ChakraLink } from '@chakra-ui/react';
import {
  Link as ReactRouterLink,
  useResolvedPath,
  useMatch,
} from 'react-router-dom';

type CustomNavLinkProps = {
  children: React.ReactNode;
  to: string;
};
export const CustomNavLink = ({ children, to }: CustomNavLinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({
    path: resolved.pathname,
    end: true,
  });

  return (
    <ChakraLink
      as={ReactRouterLink}
      to={to}
      color={match ? 'blue.400' : 'gray.200'}
      _hover={{ textDecor: 'none', opacity: '.8' }}
    >
      {children}
    </ChakraLink>
  );
};
