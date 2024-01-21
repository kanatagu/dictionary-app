import baseServer from '../../../api/baseServer';
import { MyWordType } from '../../../types';

export const deleteMyWord = async (url: string): Promise<MyWordType> => {
  const res = await baseServer.delete(url);
  return res.data;
};
