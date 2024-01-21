import baseServer from '../../../api/baseServer';

export const getCategory = <T>(url: string): Promise<T> =>
  baseServer.get(url).then((res) => res.data);
