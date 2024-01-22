import baseServer from '../baseServer';

export const updateCategoryApi = async (
  url: string,
  { arg }: { arg: { name: string } }
): Promise<{ id: string; name: string }> => {
  const { name } = arg;
  const res = await baseServer.put(url, { name });
  return res.data;
};
