import baseServer from '../../../api/baseServer';
import { MyWordType } from '../../../types';

export const addMyWord = async (
  url: string,
  { arg }: { arg: Omit<MyWordType, 'id'> }
): Promise<MyWordType> => {
  const res = await baseServer.post(url, arg);
  return res.data;
};
