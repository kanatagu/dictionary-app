import baseServer from '../baseServer';

export const logoutApi = <T>(url: string): Promise<T> =>
  baseServer.get(url).then((res) => res.data);
