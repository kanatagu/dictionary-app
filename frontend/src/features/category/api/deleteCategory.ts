import baseServer from '../../../api/baseServer';

export const deleteCategory = async (
  url: string
): Promise<{ id: string; name: string }> => {
  const res = await baseServer.delete(url);
  return res.data;
};
