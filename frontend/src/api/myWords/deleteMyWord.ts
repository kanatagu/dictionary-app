import baseServer from '../baseServer';
import { MyWordType } from '../../types';

export const deleteMyWordApi = async (url: string): Promise<MyWordType> => {
  const res = await baseServer.delete(url);
  return res.data;
};
