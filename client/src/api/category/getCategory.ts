import baseServer from '../baseServer';

export const getCategoryApi = <T>(url: string): Promise<T> =>
  baseServer.get(url).then((res) => res.data);
