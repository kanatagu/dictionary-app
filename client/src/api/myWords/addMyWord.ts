import baseServer from '../baseServer';
import { MyWordType } from '../../types';

export const addMyWordApi = async (
  url: string,
  { arg }: { arg: Omit<MyWordType, 'id'> }
): Promise<MyWordType> => {
  const res = await baseServer.post(url, arg);
  return res.data;
};
