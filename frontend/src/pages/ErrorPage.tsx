import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Error } from '../components';

export const ErrorPage = () => {
  const error = useRouteError();

  function errorMessage(error: unknown): string {
    console.error(error);
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    } else if (typeof error === 'string') {
      return error;
    } else {
      return '';
    }
  }

  return (
    <div id='error-page'>
      <Error errorMessage={errorMessage(error)} />
    </div>
  );
};
