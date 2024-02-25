import baseServer from '../baseServer';

export const signUpApi = async (
  url: string,
  { arg }: { arg: { email: string; password: string } }
): Promise<{ id: string; email: string }> => {
  const res = await baseServer.post(url, arg);
  return res.data;
};
