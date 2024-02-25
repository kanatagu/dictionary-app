import baseServer from '../baseServer';
import { MyWordType } from '../../types';

export const updateMyWordApi = async (
  url: string,
  { arg }: { arg: Omit<MyWordType, 'id'> }
): Promise<MyWordType> => {
  const res = await baseServer.put(url, arg);
  return res.data;
};
