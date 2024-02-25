import baseServer from '../baseServer';

export const getUserApi = (
  url: string
): Promise<{ id: string; email: string }> =>
  baseServer.get(url).then((res) => res.data);
