import baseServer from '../baseServer';

export const createCategoryApi = async (
  url: string,
  { arg }: { arg: { name: string } }
): Promise<Response> => {
  const { name } = arg;
  const res = await baseServer.post(url, { name });
  return res.data;
};
