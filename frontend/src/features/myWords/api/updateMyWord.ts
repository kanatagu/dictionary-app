import baseServer from '../../../api/baseServer';
import { MyWordType } from '../../../types';

export const updateMyWord = async (
  url: string,
  { arg }: { arg: Omit<MyWordType, 'id'> }
): Promise<MyWordType> => {
  const res = await baseServer.put(url, arg);
  return res.data;
};
