import baseServer from '../baseServer';

export const deleteCategoryApi = async (
  url: string
): Promise<{ id: string; name: string }> => {
  const res = await baseServer.delete(url);
  return res.data;
};
