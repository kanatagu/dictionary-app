import baseServer from '../baseServer';

export const getMyWordApi = <T>(url: string): Promise<T> =>
  baseServer.get(url).then((res) => res.data);
